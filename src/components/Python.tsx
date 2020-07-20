import styled from "@emotion/styled";
import { editor } from "monaco-editor";
import React from "react";
import { Fail, Pending, Success, Unknown } from "./Icons";
import { v4 as uuidv4 } from "uuid";

type Evaluation = { eval: string; expect: any; hint: string };

type State = "success" | "fail" | "pending" | "unknown";

type Result = {
  evaluation: Evaluation;
  received?: any;
  state: State;
  stdout: string[];
  stderr: string[];
};

const Tabs = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Tab = styled.div`
  padding: 4px 16px;
  border: 1px solid black;
  border-top: none;
  margin-right: 2px;
  cursor: pointer;
  user-select: none;
`;

const ResultSummary = styled.div`
  flex: 1 0 auto;
`;

let pyodideWorker: Worker;

let activeExecutions = 0;

function run(
  code: string,
  onStdout: (s: string) => void,
  onStderr: (s: string) => void
) {
  if (!pyodideWorker) {
    pyodideWorker = new Worker("/pyodide/webworker.js");
  }
  const activeId = uuidv4();
  activeExecutions++;
  const promise = new Promise((resolve, reject) => {
    const listener = (e: MessageEvent) => {
      const { id, results, error, stdout, stderr } = e.data;
      if (id !== activeId) {
        return;
      }
      if (stdout) {
        onStdout(stdout);
      } else if (stderr) {
        onStderr(stderr);
      } else if (error !== undefined) {
        reject(error);
      } else {
        resolve(results);
        activeExecutions--;
        pyodideWorker.removeEventListener("message", listener);
      }
    };
    pyodideWorker.addEventListener("message", listener);
  });
  pyodideWorker.postMessage({ id: activeId, python: code });
  return promise;
}

function interrupt() {
  if (activeExecutions > 0 && pyodideWorker) {
    pyodideWorker.terminate();
    pyodideWorker = null;
  }
}

function DetailedResult({ result }: { result: Result }) {
  return (
    <div>
      <div>
        Test case: <code>{result.evaluation.eval}</code> expecting{" "}
        <code>{JSON.stringify(result.evaluation.expect)}</code>
        {result.received && (
          <span>
            {" "}
            and got <pre>{result.received}</pre>
          </span>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{ flex: "0 0 50%", overflow: "scroll", maxHeight: "400px" }}
        >
          <strong>stdout</strong>
          <pre>{result.stdout.join("\n")}</pre>
        </div>
        <div
          style={{ flex: "0 0 50%", overflow: "scroll", maxHeight: "400px" }}
        >
          <strong>stderr</strong>
          <pre>{result.stderr.join("\n")}</pre>
        </div>
      </div>
    </div>
  );
}

export default ({
  initialContent,
  hiddenContent,
  solution,
  evaluations,
}: {
  initialContent: string;
  hiddenContent: string;
  solution: string;
  evaluations: Evaluation[];
}) => {
  const container = React.useRef<HTMLDivElement>();

  const [monaco, setMonaco] = React.useState<typeof import("monaco-editor")>();

  const [results, setResults] = React.useState<Result[]>(
    evaluations.map((evaluation) => ({
      evaluation,
      state: "unknown",
      stdout: [],
      stderr: [],
    }))
  );

  const [activeResultIndex, setActiveResultIndex] = React.useState<number>();

  React.useEffect(() => {
    let unloaded = false;
    import("monaco-editor").then((monaco) => {
      if (unloaded) {
        return;
      }
      setMonaco(monaco);
    });
    return () => (unloaded = true);
  }, []);

  function compare(expected: any, actual: any) {
    if (typeof expected === "number") {
      return Math.abs(expected - (actual as number)) < 1e-3;
    } else if (Array.isArray(expected)) {
      return expected.every((x, i) => compare(x, actual[i]));
    } else {
      return expected === actual;
    }
  }

  function evaluate(content: string) {
    interrupt();
    setResults((results) =>
      results.map((result) => ({
        ...result,
        state: "pending",
        received: undefined,
      }))
    );
    const promises = evaluations.map(async (evaluation) => {
      try {
        const output = await run(
          content + "\n\n" + hiddenContent + "\n\n" + evaluation.eval,
          (s) => {
            setResults((results) =>
              results.map((result) => {
                if (result.evaluation.eval === evaluation.eval) {
                  return { ...result, stdout: [...result.stdout, s] };
                } else {
                  return result;
                }
              })
            );
          },
          (s) => {
            setResults((results) =>
              results.map((result) => {
                if (result.evaluation.eval === evaluation.eval) {
                  return { ...result, stderr: [...result.stderr, s] };
                } else {
                  return result;
                }
              })
            );
          }
        );
        setResults((results) => {
          return results.map((result) => {
            if (result.evaluation.eval !== evaluation.eval) {
              return result;
            }
            const correct = compare(evaluation.expect, output);
            return {
              ...result,
              received: output,
              state: correct ? "success" : "fail",
            };
          });
        });
      } catch (err) {
        setResults((results) => {
          return results.map((result) => {
            if (result.evaluation.eval !== evaluation.eval) {
              return result;
            }
            return {
              ...result,
              received: err,
              state: "fail",
            };
          });
        });
      }
    });
    return Promise.all(promises);
  }

  function setContent(content: string) {
    if (!editor) {
      return;
    }
    const existingContent = editor
      .getModel()
      .getValue()
      .trim()
      .split("\n")
      .map((line) => `# ${line}`)
      .join("\n");

    const newContent = `${content}\n\n${existingContent}`;
    editor.getModel().setValue(newContent);
    setResults((results) =>
      results.map((result) => ({
        ...result,
        state: "unknown",
        received: undefined,
      }))
    );
    interrupt();
  }

  const [editor, setEditor] = React.useState<editor.IStandaloneCodeEditor>();

  React.useEffect(() => {
    if (!container.current || !monaco) {
      return;
    }
    const codeEditor = monaco.editor.create(container.current, {
      value: initialContent,
      language: "python",
      automaticLayout: true,
    });

    codeEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      console.log("Ignoring save.");
    });

    codeEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      evaluate(codeEditor.getModel().getValue());
    });
    setEditor(codeEditor);
    return () => {
      setEditor(undefined);
      codeEditor.dispose();
    };
  }, [monaco, initialContent]);

  return (
    <p>
      <div ref={container} style={{ height: "400px" }}></div>
      <Tabs>
        <ResultSummary>
          {results.map((result, i) => {
            return (
              <span
                key={result.evaluation.eval}
                onClick={() => setActiveResultIndex(i)}
              >
                {(() => {
                  switch (result.state) {
                    case "unknown":
                      return <Unknown />;
                    case "pending":
                      return <Pending />;
                    case "success":
                      return <Success />;
                    case "fail":
                      return <Fail />;
                  }
                })()}
              </span>
            );
          })}
        </ResultSummary>
        <Tab role="button" onClick={() => setContent(solution)}>
          Show Solution
        </Tab>
        <Tab role="button" onClick={() => setContent(initialContent)}>
          Reset
        </Tab>
        <Tab
          role="button"
          onClick={() => {
            if (editor) {
              evaluate(editor.getModel().getValue());
            }
          }}
        >
          Run
        </Tab>
      </Tabs>
      {activeResultIndex !== undefined && (
        <DetailedResult result={results[activeResultIndex]} />
      )}
    </p>
  );
};
