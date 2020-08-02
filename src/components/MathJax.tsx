import * as React from "react";
import { mathjax } from "mathjax-full/js/mathjax";
import { TeX } from "mathjax-full/js/input/tex";
import { SVG } from "mathjax-full/js/output/svg";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html";
import { OptionList } from "mathjax-full/js/util/Options";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages";

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const tex = new TeX({ packages: AllPackages });
const svg = new SVG({ fontCache: "local" });
const html = mathjax.document("", { InputJax: tex, OutputJax: svg });

export default ({
  tex,
  options,
  ...props
}: { tex: string; options?: OptionList } & React.HTMLAttributes<
  HTMLSpanElement
>) => {
  return (
    <span
      {...props}
      dangerouslySetInnerHTML={{
        __html: adaptor.outerHTML(html.convert(tex, options)),
      }}
    ></span>
  );
};
