// If you don't want to use TypeScript you can delete this file!
import styled from "@emotion/styled";
import * as d3 from "d3";
import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import { Fail, Pending, Success, Unknown } from "../../../components/Icons";
import Layout from "../../../components/Layout";
import MathJax from "../../../components/MathJax";
import Python from "../../../components/Python";
import SEO from "../../../components/seo";
import problems from "../../../python/fundamentals/gradient-descent/problems";
import solutions from "../../../python/fundamentals/gradient-descent/solutions";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 16px;
`;

const Sticky = styled.div`
  position: sticky;
  top: 128px;
  margin-bottom: 32px;
`;

function Graph({ x: markerX }: { x?: number }) {
  function f(x: number) {
    return x * x + 2 * x + 4;
  }
  const [hoverX, setHoverX] = React.useState<number>();
  const [isHovering, setHovering] = React.useState(false);

  const tex =
    !isHovering || hoverX === undefined
      ? `f(x) = x^2 + 2x + 4`
      : `f(${hoverX.toFixed(2)}) = ${(hoverX * hoverX + 2 * hoverX + 4).toFixed(
          2
        )}`;

  const xScale = React.useMemo(
    () => d3.scaleLinear().domain([-10, 10]).range([0, 300]),
    []
  );

  const yScale = React.useMemo(
    () => d3.scaleLinear().domain([125, 0]).range([0, 300]),
    []
  );

  const line = React.useMemo(() => d3.line(), []);

  const xAxisRef = React.useRef<SVGGElement>(null);
  const yAxisRef = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (!xAxisRef.current) {
      return;
    }
    d3.select(xAxisRef.current).call(d3.axisBottom(xScale));
  }, [xAxisRef, xScale]);

  React.useEffect(() => {
    if (!yAxisRef.current) {
      return;
    }
    d3.select(yAxisRef.current).call(d3.axisLeft(yScale));
  }, [yAxisRef, yScale]);

  const data = React.useMemo(
    () =>
      Array.from({ length: 21 }).map((_, i) => {
        const x = i - 10;
        return [xScale(x), yScale(x * x + 2 * x + 4)] as [number, number];
      }),
    [xScale, yScale]
  );

  return (
    <>
      <svg
        width="400"
        height="400"
        onMouseMove={(e) => {
          const x = xScale.invert(
            e.clientX - e.currentTarget.getBoundingClientRect().left - 50
          );
          const [x0, x1] = xScale.domain();
          setHovering(x0 <= x && x <= x1);
          setHoverX(x);
        }}
      >
        <g transform="translate(50, 50)">
          <defs>
            <marker
              id="triangle"
              refX={6}
              refY={6}
              markerWidth={30}
              markerHeight={30}
              markerUnits="userSpaceOnUse"
              orient="auto"
            >
              <path d="M 0 0 12 6 0 12 3 6" />
            </marker>
          </defs>
          <g ref={xAxisRef} transform="translate(0, 300)" />
          <g ref={yAxisRef} />
          <path
            d={line(data)}
            stroke="steelblue"
            fill="none"
            strokeWidth="1.5"
          />
          <g>
            {isHovering && hoverX !== undefined && (
              <line
                x1={xScale(hoverX)}
                y1={yScale(f(hoverX))}
                x2={xScale(hoverX + 2 * hoverX + 2)}
                y2={yScale(f(hoverX))}
                strokeWidth={1}
                stroke="black"
                markerEnd="url(#triangle)"
              />
            )}
            {isHovering && hoverX !== undefined && (
              <path
                stroke="black"
                strokeWidth="1px"
                d={`M${xScale(hoverX)},${yScale(125)} ${xScale(
                  hoverX
                )},${yScale(0)}`}
              />
            )}
          </g>
          {markerX && (
            <circle cx={xScale(markerX)} cy={yScale(f(markerX))} r={5} />
          )}
        </g>
      </svg>
      <div style={{ textAlign: "center" }}>
        <MathJax tex={tex} />
      </div>
    </>
  );
}

function OneDimensionPython() {
  return (
    <>
      <p>
        Try coding this in python. First, define the function{" "}
        <MathJax tex="f(x) = x^2 + 2x + 4" /> and its gradient{" "}
        <MathJax tex="\nabla f(x) = 2x + 2" />.
      </p>
      <p>
        Within this environment, you can use <code>print(x)</code> as normal to
        print output. Click "Run" to check if your code is correct. The function
        signatures have been provided to help guide your implementation. Don't
        change the name of the functions, however, as the checker relies on
        those names to grade the code.
      </p>
      <p>A number of icons show up below the editor, one for each test case.</p>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
      >
        <Unknown />
        &nbsp;&nbsp; This test case hasn't been evaluated yet.
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
      >
        <Pending />
        &nbsp;&nbsp; This test case is currently running.
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
      >
        <Success />
        &nbsp;&nbsp; This test case passed.
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}
      >
        <Fail />
        &nbsp;&nbsp; This test case failed. Click it to find out why.
      </div>
      <Python
        hiddenContent=""
        initialContent={problems.a}
        solution={solutions.a}
        evaluations={[
          { eval: "f(2)", expect: 12, hint: "Check" },
          { eval: "f(4)", expect: 28, hint: "Check" },
          { eval: "f(8)", expect: 84, hint: "Check" },
          { eval: "gradient(2)", expect: 6, hint: "Check" },
          { eval: "gradient(4)", expect: 10, hint: "Check" },
          { eval: "gradient(8)", expect: 18, hint: "Check" },
        ]}
      />
      <p>
        Implement <code>gradient_descent_1d()</code>. The gradient descent
        function takes as parameters
      </p>
      <ol>
        <li>
          <code>grad</code>: a function to compute the gradient
        </li>
        <li>
          <code>alpha</code>: the learning rate <MathJax tex="\alpha" />
        </li>
        <li>
          <code>x</code>: the starting point <MathJax tex="x_0" />
        </li>
      </ol>
      <p>
        For the stopping condition, stop when the precision is within{" "}
        <MathJax tex="0.0001" /> of the local minimum. As a reminder, the
        algorithm is repeated at the top of the editor.
      </p>
      <Python
        hiddenContent=""
        initialContent={problems.b}
        solution={solutions.b}
        evaluations={[
          {
            eval: "gradient_descent_1d(lambda x: 2 * x + 2, 0.1, 10)",
            expect: -1,
            hint: "Check",
          },
          {
            eval: "gradient_descent_1d(lambda x: 2 * x + 2, 0.2, 4)",
            expect: -1,
            hint: "Check",
          },
          {
            eval: "gradient_descent_1d(lambda x: 2 * x + 2, 0.4, -8)",
            expect: -1,
            hint: "Check",
          },
        ]}
      />
    </>
  );
}

export default function ({ data, path }: PageProps<{}>) {
  const [alpha, setAlpha] = React.useState("");
  const [x, setX] = React.useState("");
  return (
    <Layout>
      <SEO title="Gradient Descent" />
      <h1>Gradient Descent</h1>
      <p>
        Gradient descent is the most common learning algorithm for neural
        network implementations. It finds local minimums or maximums for a given
        function. Let's consider a simple function{" "}
        <MathJax tex="f(x) = x^2 + 2x + 4" />.
      </p>
      <Grid>
        <div>
          <p>
            By looking at the graph, we can see that the minimum of this
            function is located at <MathJax tex="x = -1" />, but how can a
            computer figure this out? From calculus, we know that the minimum of
            the function occurs where the derivative is equal to zero.
          </p>
          <MathJax
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "24px",
            }}
            tex="\frac{d f(x)}{d x} = 0"
          />
          <p>
            While math class can teach us how to solve this, a computer can't do
            so quite as easily. Instead, an algorithm must be used, called{" "}
            <strong>gradient descent</strong>. The <strong>gradient</strong> of
            a function is like the derivative: it points away from the minimum.
            The difference between the two arises in higher dimensions, but for
            now think of the gradient as the derivative. Hover over the graph to
            see the gradient appear as a black arrow. Intuitively, the gradient
            is the vector pointing at the "uphill" direction with a length
            corresponding to the magnitude of the incline. The{" "}
            <strong>descent</strong> part of the algorithm is choosing to go
            opposite of the "uphill" direction, effectively going towards the
            minimum instead of the maximum.
          </p>
          <p>
            This algorithm will work as follows. Recall that because the
            gradient points <em>away</em> from the minimum, step 3 will move in
            the direction <em>opposite</em> the gradient to find the minimum.
          </p>
          <ol>
            <li>
              Pick an arbitrary starting location <MathJax tex={`x`} />.
            </li>
            <li>
              Calculate the gradient <MathJax tex={`\\nabla f(x)`} />.
            </li>
            <li>
              Move to a new{" "}
              <MathJax tex={`x' = x - \\alpha \\cdot \\nabla f(x)`} />.
            </li>
            <li>
              If the difference small enough, stop. Otherwise, repeat with
              updated <MathJax tex="x'" />.
            </li>
          </ol>
          <p>
            To get a better idea of how the algorithm works, let's step through
            some of the logic. For a one-dimensional function, the gradient{" "}
            <MathJax tex="\nabla f(x)" /> is equal to the derivative of the
            function, <MathJax tex="\nabla f(x) = 2x + 2" />.
          </p>
          <p>
            First, choose an <MathJax tex="\alpha = " />
            &nbsp;
            <input
              style={{ width: "75px" }}
              value={alpha}
              step={0.01}
              onChange={(e) => setAlpha(e.target.value)}
              type="number"
            />
            . A value of <MathJax tex="0.1" /> is a good starting point.
          </p>
          <p>
            Next, choose an arbitrary starting location <MathJax tex="x = " />
            <input
              style={{ width: "75px" }}
              value={x}
              step={0.01}
              onChange={(e) => setX(e.target.value)}
              type="number"
            />
          </p>
          <p>
            The gradient is computed as{" "}
            <MathJax tex="\nabla f(x) = 2x + 2 = " />
            <input
              style={{ width: "75px" }}
              value={x === "" ? "" : 2 * Number(x) + 2}
              readOnly
            />
          </p>
          <p>
            Compute <MathJax tex="x' = x - \alpha \cdot \nabla f(x) = " />
            <input
              style={{ width: "75px" }}
              value={
                x === "" || alpha === ""
                  ? ""
                  : Number(x) - Number(alpha) * (2 * Number(x) + 2)
              }
              readOnly
            />
          </p>
          <p>
            Lastly, assign <MathJax tex="x'" /> to <MathJax tex="x" />.{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (x === "" || alpha === "") {
                  return;
                }
                setX(String(Number(x) - Number(alpha) * (2 * Number(x) + 2)));
              }}
            >
              Click here to do so automatically
            </a>{" "}
            and watch how <MathJax tex="x" /> behaves.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Sticky>
            <Graph x={x === "" ? undefined : Number(x)} />
          </Sticky>
        </div>
      </Grid>
      <p>
        Try different values of <MathJax tex="\alpha" />. What happens when{" "}
        <MathJax tex="\alpha = 1" />? What happens when{" "}
        <MathJax tex="\alpha \gt 1" />?
      </p>
      <p>
        With some experimenting, different values of <MathJax tex="\alpha" />{" "}
        affect how fast the algorithm is able to find the minimum. Therefore,{" "}
        <MathJax tex="\alpha" /> is typically called the{" "}
        <strong>learning rate</strong>.
      </p>
      <hr />
      <OneDimensionPython />
      <h2>Two dimensions</h2>
      <p>
        The above function <MathJax tex="f(x) = x^2 + 2x + 4" /> operates in one
        dimension, but gradient descent can operate in higher dimensional
        spaces. Consider a two-dimensional function <MathJax tex="f(x, y)" />.
      </p>
      <p>
        Instead of a single derivative, there are two partial derivatives, one
        for each of the dimensions.
      </p>
      <p style={{ textAlign: "center" }}>
        <MathJax tex="\frac{\partial f(x, y)}{\partial x}, \frac{\partial f(x, y)}{\partial y}" />
      </p>
      <p style={{ marginTop: "16px" }}>
        In step 3, the updating equation was{" "}
        <MathJax tex="x' = x - \alpha \cdot \nabla f(x)" />. With two dimensions
        there are two updating equations, one for each dimension.
      </p>
      <p style={{ textAlign: "center" }}>
        <MathJax tex="x' = x - \alpha \cdot \frac{\partial f(x, y)}{\partial x}" />
      </p>
      <p style={{ textAlign: "center" }}>
        <MathJax tex="y' = y - \alpha \cdot \frac{\partial f(x, y)}{\partial y}" />
      </p>
      <p>
        In order to handle multiple dimensions, the gradient descent algorithm
        will first calculate the gradient for the <MathJax tex="x" /> dimension
        and update it, then calculate the gradient for the <MathJax tex="y" />{" "}
        dimension and update it. In essence, two instances of gradient descent
        are running in sequence, one for each dimension.
      </p>
      <p>
        Update the one-dimensional gradient descent to work on two dimensions.
        The two gradient functions, <code>grad_x</code> and <code>grad_y</code>{" "}
        are supplied. Stop when both <MathJax tex="x" /> and <MathJax tex="y" />{" "}
        change less than <MathJax tex="0.0001" />.
      </p>
      <Python
        hiddenContent=""
        initialContent={problems.c}
        solution={solutions.c}
        evaluations={[
          {
            eval:
              "gradient_descent_2d(lambda x, y: 2 * x + 2, lambda x, y: 2 * y + 3, 0.1, 1, 3)",
            expect: [-1, -1.5],
            hint: "f(x, y) = x^2 + y^2 + 2x + 3y",
          },
          {
            eval:
              "gradient_descent_2d(lambda x, y: 2 * x + 2, lambda x, y: 2 * y + 3, 0.1, -3, 4)",
            expect: [-1, -1.5],
            hint: "f(x, y) = x^2 + y^2 + 2x + 3y",
          },
          {
            eval:
              "gradient_descent_2d(lambda x, y: 2 * x + 2, lambda x, y: 2 * y + 3, 0.1, -3, -3)",
            expect: [-1, -1.5],
            hint: "f(x, y) = x^2 + y^2 + 2x + 3y",
          },
        ]}
      />
      <p>
        Congratulations, you've implemented a two-dimensional gradient descent
        solver! Next, we'll take a look at how to apply gradient descent to
        solving linear regressions.
      </p>
      <div>
        <ul>
          <li>
            <Link to="/fundamentals/regressions/">Continue to Regressions</Link>
          </li>
          <li>
            <Link to="/">Go back to the table of contents</Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
