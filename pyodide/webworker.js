self.languagePluginUrl = "/pyodide/";
importScripts("./pyodide.js");

const queue = [];

self.onmessage = (e) => {
  queue.push(e);
};

languagePluginLoader.then(() => {
  self.pyodide.loadPackage(["numpy"]).then(() => {
    let activeId = undefined;
    self.receive_stdout = (s) => {
      self.postMessage({ id: activeId, stdout: s });
    };

    self.receive_stderr = (s) => {
      self.postMessage({ id: activeId, stderr: s });
    };

    self.pyodide.runPython(
      `
from js import receive_stdout, receive_stderr
import sys
def except_hook(exctype, value, traceback):
  receive_stderr(str(traceback))

class Interceptor:
  def __init__(self, stdout):
    self.stdout = stdout

  def write(self, line):
    if self.stdout:
      receive_stdout(line)
    else:
      receive_stderr(line)

  def writelines(self, lines):
    for line in lines:
      if self.stdout:
        receive_stdout(line)
      else:
        receive_stderr(line)

sys.excepthook = except_hook
sys.stdout = Interceptor(True)
sys.stderr = Interceptor(False)
`.trimLeft()
    );

    function handle(e) {
      const data = e.data;
      const keys = Object.keys(data);
      activeId = data.id;
      for (let key of keys) {
        if (key !== "python") {
          // Keys other than python must be arguments for the python script.
          // Set them on self, so that `from js import key` works.
          self[key] = data[key];
        }
      }

      try {
        self.postMessage({
          id: activeId,
          results: self.pyodide.runPython(data.python),
        });
      } catch (err) {
        self.postMessage({ id: activeId, error: err.message });
      }
    }

    self.onmessage = handle;

    queue.forEach(handle);
  });
});
