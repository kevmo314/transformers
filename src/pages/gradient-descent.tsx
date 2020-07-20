// If you don't want to use TypeScript you can delete this file!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  MarkSeries,
} from "react-vis";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import MathJax from "../components/MathJax";
import "react-vis/dist/style.css";
import styled from "@emotion/styled";
import Python from "../components/Python";
import { Unknown, Success, Fail, Pending } from "../components/Icons";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 16px;
`;

function OneDimension() {
  function f(x: number) {
    return x * x + 2 * x + 4;
  }

  const [activeStep, setActiveStep] = React.useState<1 | 2 | 3 | 4 | 5>();
  const [hoverX, setHoverX] = React.useState<number>();
  const [activeX, setActiveX] = React.useState<number>();
  const [alpha, setAlpha] = React.useState(0.1);
  const [isHovering, setHovering] = React.useState(false);

  const tex =
    !isHovering || hoverX === undefined
      ? `f(x) = x^2 + 2x + 4`
      : `f(${hoverX}) = ${hoverX * hoverX + 2 * hoverX + 4}`;

  React.useEffect(() => {
    if (!activeStep) {
      return;
    }
    const timeout = setTimeout(() => {
      switch (activeStep) {
        case 1:
          setActiveStep(2);
          break;
        case 2:
          setActiveStep(3);
          break;
        case 3:
          setActiveStep(4);
          break;
        case 4:
          const delta = alpha * (2 * activeX + 2);
          setActiveX(activeX - delta);
          if (Math.abs(delta) < 1e-3) {
            setActiveStep(undefined);
          } else {
            setActiveStep(1);
          }
          break;
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [activeStep]);

  return (
    <>
      <div>
        <p>
          By looking at the graph, we can see that the minimum of this function
          is located at <MathJax tex="x = -1" />, but how can a computer figure
          this out? Recall from calculus that in order to find the minimum, we
          must solve
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
          But a computer can't solve this so easily. Instead, we'll apply an
          approach called <strong>gradient descent</strong>. This algorithm will
          work as follows
        </p>
        <ol>
          <li style={{ color: activeStep == 1 ? "red" : "inherit" }}>
            Pick an arbitrary starting location <MathJax tex={`x`} />.
          </li>
          <li style={{ color: activeStep == 2 ? "red" : "inherit" }}>
            Calculate the gradient <MathJax tex={`\\nabla f(x)`} />.
          </li>
          <li style={{ color: activeStep == 4 ? "red" : "inherit" }}>
            Move to a new{" "}
            <MathJax tex={`x' = x - \\alpha \\cdot \\nabla f(x)`} />.
          </li>
          <li style={{ color: activeStep == 5 ? "red" : "inherit" }}>
            If the difference small enough, stop. Otherwise, repeat with updated{" "}
            <MathJax tex="x'" />.
          </li>
        </ol>
        <p>
          For our one-dimensional function, the gradient{" "}
          <MathJax tex="\nabla f(x)" /> is equal to the derivative of the
          function, <MathJax tex="\nabla f(x) = 2x + 2" />.
        </p>
        <p>
          Choose an <MathJax tex="\alpha = " />
          &nbsp;
          <input
            value={alpha}
            step={0.01}
            onChange={(e) => setAlpha(Number(e.target.value))}
            type="number"
          />
        </p>
        <p>
          Then click anywhere on the graph to see what happens. Try different
          values of <MathJax tex="\alpha" />. What happens when{" "}
          <MathJax tex="\alpha = 1" />? What happens when{" "}
          <MathJax tex="\alpha \gt 1" />?
        </p>
        <p>
          With some experimenting, different values of <MathJax tex="\alpha" />{" "}
          affect how fast the algorithm is able to find the minimum. Therefore,{" "}
          <MathJax tex="\alpha" /> is typically called the{" "}
          <strong>learning rate</strong>.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <XYPlot
          height={300}
          width={300}
          xDomain={[-10, 10]}
          yDomain={[0, 124]}
          onMouseLeave={() => setHovering(false)}
          onMouseEnter={() => setHovering(true)}
          onClick={() => {
            setActiveX(hoverX);
            setActiveStep(1);
          }}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
            data={Array.from({ length: 21 }).map((_, i) => {
              const x = i - 10;
              return { x, y: x * x + 2 * x + 4 };
            })}
            onNearestX={({ x }) => setHoverX(x)}
          />
          {isHovering && hoverX !== undefined && (
            <LineSeries
              data={[
                { x: hoverX, y: 0 },
                { x: hoverX, y: f(10) },
              ]}
            />
          )}
          {activeX !== undefined && (
            <MarkSeries data={[{ x: activeX, y: f(activeX) }]} />
          )}
        </XYPlot>
        <MathJax tex={tex} />
        {activeX !== undefined && (
          <div style={{ marginTop: "16px" }}>
            <div>
              <MathJax tex={`x = ${activeX.toFixed(2)}`} />
            </div>
            <div>
              <MathJax tex={`\\nabla f(x) = ${(2 * activeX + 2).toFixed(2)}`} />
            </div>
          </div>
        )}
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
        <MathJax tex="\nabla f(x) = 2x + 2" />. This isn't intended to be
        challenging, but rather just a warmup to get you familiar with the
        environment. Don't worry, the difficult parts will come soon enough.
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
        initialContent={`
def f(x: float) -> float:
  pass  # Implement this.

def gradient(x: float) -> float:
  pass  # Implement this.`.trimLeft()}
        solution={`
def f(x: float) -> float:
  return x ** 2 + 2 * x + 4
          
def gradient(x: float) -> float:
  return 2 * x + 2`.trimLeft()}
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
        Now that we have the gradient set up, try implementing gradient descent.
        For the stopping condition, stop when the precision is within{" "}
        <MathJax tex="0.0001" /> of the local minimum.
      </p>
      <Python
        hiddenContent=""
        initialContent={`
# Gradient descent
# 1. Pick a starting point x.
# 2. Calculate the gradient at x.
# 3. Move to a new x = x - alpha * gradient.
# 4. If the difference with the previous x < 0.001, return. Otherwise, repeat with new x.

from typing import Callable

def gradient_descent(grad: Callable[[float], float], alpha: float, x: float) -> float:
    pass  # Implement this.`.trimLeft()}
        solution={`
from typing import Callable

def gradient_descent(grad: Callable[[float], float], alpha: float, x: float) -> float:
    delta = 1
    while abs(delta) >= 0.0001:
        delta = alpha * grad(x)
        x -= delta
    return x`.trimLeft()}
        evaluations={[
          {
            eval: "gradient_descent(lambda x: 2 * x + 2, 0.1, 10)",
            expect: -1,
            hint: "Check",
          },
          {
            eval: "gradient_descent(lambda x: 2 * x + 2, 0.2, 4)",
            expect: -1,
            hint: "Check",
          },
          {
            eval: "gradient_descent(lambda x: 2 * x + 2, 0.4, -8)",
            expect: -1,
            hint: "Check",
          },
        ]}
      />
    </>
  );
}

export default function ({ data, path }: PageProps<{}>) {
  return (
    <Layout>
      <SEO title="Gradient Descent" />
      <h1>Gradient Descent</h1>
      <p>
        Gradient descent is the most common learning algorithm for neural
        networks, which finds the local minimum or maximum of a function. There
        are some nuances around what types of functions work, but let's not get
        into that for now. Instead, let's consider a simple function{" "}
        <MathJax tex="f(x) = x^2 + 2x + 4" />.
      </p>
      <Grid>
        <OneDimension />
      </Grid>
      <hr />
      <OneDimensionPython />
      <h2>Higher dimensions</h2>
      <p>
        The above function <MathJax tex="f(x) = x^2 + 2x + 4" /> operates in one
        dimension, but gradient descent as an algorithm can operate in higher
        dimensional spaces. Consider a two-dimensional function{" "}
        <MathJax tex="f(x, y)" />.
      </p>
      <p>
        Now, instead of a single derivative, there are two partial derivatives,
        one for each of the dimensions.
      </p>
      <div style={{ textAlign: "center" }}>
        <MathJax tex="\frac{\partial f(x, y)}{\partial x}, \frac{\partial f(x, y)}{\partial y}" />
      </div>
      <p style={{ marginTop: "16px" }}>
        Looking at the original <MathJax tex="x" /> updating equation{" "}
        <MathJax tex="x' = x - \alpha \cdot \nabla f(x)" />, with two dimensions
        each of the components can be updated independently.
      </p>
      <div style={{ textAlign: "center" }}>
        <MathJax tex="x' = x - \alpha \cdot \frac{\partial f(x, y)}{\partial x}" />
      </div>
      <div style={{ textAlign: "center", marginTop: "8px" }}>
        <MathJax tex="y' = y - \alpha \cdot \frac{\partial f(x, y)}{\partial y}" />
      </div>
      <p style={{ marginTop: "16px" }}>
        Play around with the visualization to the right to see this in action.
      </p>
      <p>
        Extending beyond two dimensions, enumerating every partial derivative
        becomes unwieldy. To simplify, represent the coordinate{" "}
        <MathJax tex="(x, y)" /> as the vector <MathJax tex="\vec{X}" />. The
        function <MathJax tex="f(x, y)" /> becomes <MathJax tex="f(\vec{X})" />{" "}
        and the gradient descent updating equation becomes{" "}
        <MathJax tex="\vec{X}' = \vec{X} - \alpha \cdot \nabla f(\vec{X})" />.
        Looks suspiciously similar, doesn't it? That's not a coincidence, of
        course.
      </p>
      <hr />
      <p>
        Because the update equation is so similar, implementing it should also
        be similar. Try updating the one-dimensional gradient descent to support
        an arbitrary number of dimensions. We've already updated the type
        information for you. Recall that the length of a vector can be computed
        with <code>numpy.linalg.norm(x)</code>.
      </p>
      <Python
        hiddenContent=""
        initialContent={`
import numpy as np

from typing import Callable

def gradient_descent(grad: Callable[[np.array], np.array], alpha: float, x: np.array) -> np.array:
    delta = np.ones_like(x)
    while abs(delta) >= 0.0001:
        delta = alpha * grad(x)
        x -= delta
    return x`.trimLeft()}
        solution={`
import numpy as np

from typing import Callable

def gradient_descent(grad: Callable[[np.array], np.array], alpha: float, x: np.array) -> np.array:
    delta = np.ones_like(x)
    while np.linalg.norm(delta) >= 0.0001:
        delta = alpha * grad(x)
        x -= delta
    return x`.trimLeft()}
        evaluations={[
          {
            eval:
              "gradient_descent(lambda x: 2 * x + np.array([2., 3.]), 0.1, np.array([1., 3.]))",
            expect: [-1, -1.5],
            hint: "f(x, y) = x^2 + y^2 + 2x + 3y",
          },
          {
            eval:
              "gradient_descent(lambda x: 2 * x + np.array([2., 3.]), 0.1, np.array([-3., 4.]))",
            expect: [-1, -1.5],
            hint: "f(x, y) = x^2 + y^2 + 2x + 3y",
          },
          {
            eval:
              "gradient_descent(lambda x: 2 * x + np.array([2., 3.]), 0.1, np.array([-3., -3.]))",
            expect: [-1, -1.5],
            hint: "f(x, y) = x^2 + y^2 + 2x + 3y",
          },
        ]}
      />
      <p>
        Congratulations! You've implemented multi-dimensional gradient descent!
        This allows us to find the local minimum for <MathJax tex="n" />
        -dimensional functions. While it's difficult to visualize more than two,
        higher dimensions become the foundation for most neural networks.
      </p>
      <p>
        Next, we'll take a look at how to apply gradient descent to solving
        multi-dimensional regressions.
      </p>
      <div>
        <ul>
          <li>
            <Link to="/regressions/">Continue to Regressions</Link>
          </li>
          <li>
            <Link to="/">Go back to the table of contents</Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`;
