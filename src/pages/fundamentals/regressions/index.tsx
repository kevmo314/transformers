import React from "react";

import Layout from "../../../components/Layout";
import SEO from "../../../components/SEO";
import MathJax from "../../../components/MathJax";
import problems from "../../../python/fundamentals/regressions/problems";
import solutions from "../../../python/fundamentals/regressions/solutions";
import Python from "../../../components/Python";
import { Link } from "gatsby";

export default () => (
  <Layout>
    <SEO title="Regressions" />
    <h1>Regressions</h1>
    <p>
      Linear regressions are the foundational building block of neural networks.
      At its core, linear regressions try to find a line that best represents
      the points in a dataset, known as the <strong>regression line</strong>.
    </p>
    <p>
      Drag the points on the graph to see how the regression line is influenced
      by the data.
    </p>
    <p>
      In this chapter, we'll build a solver for linear regressions using
      gradient descent. While there are analytic solutions for linear
      regressions, using gradient descent is a primer for problems that do not
      have analytic answers.
    </p>
    <p>
      Let's start with our data. The data consists of a set of points{" "}
      <MathJax tex="\{(x_1, y_1), ..., (x_n, y_n)\}" />. For example, the graph
      to the right contains
    </p>
    <p>
      <table style={{ width: "auto", margin: "0 auto" }}>
        <thead>
          <tr>
            <th>
              <MathJax tex="x_i" />
            </th>
            <th>
              <MathJax tex="y_i" />
            </th>
          </tr>
        </thead>
      </table>
      PLACEHOLDER
    </p>
    <p>
      To fit the regression line, it takes the form{" "}
      <MathJax tex="\hat y = ax + b" />
      , where <MathJax tex="a" /> and <MathJax tex="b" /> represent the slope
      and intercept of the line, respectively. Drag the sliders below to see how{" "}
      <MathJax tex="a" /> and <MathJax tex="b" /> influence the regression line.
    </p>
    <p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "24px" }}>
          <MathJax tex="a" />
        </div>
        <input type="range" min="1" max="100" value="50" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "24px" }}>
          <MathJax tex="b" />
        </div>
        <input type="range" min="1" max="100" value="50" />
      </div>
    </p>
    <p>
      For each point in the data, the <strong>error</strong>,{" "}
      <MathJax tex="\epsilon_i" />, is determined by the difference between the
      data's <MathJax tex="y_i" /> value for a given <MathJax tex="x_i" /> and
      the regression line's predicted <MathJax tex="\hat y" />. That is,
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="\epsilon_i = y_i - (a x_i + b)" />
    </p>
    <p>
      To compute the total error across all points, the{" "}
      <strong>residual sum of squares</strong> is equal to the sum of the
      squared error.
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="RSS = \sum_i^n \epsilon_i^2 = \sum_i^n (y_i - (a x_i + b))^2" />
    </p>
    <p>
      Foreshadowing, a linear regression is a simple form of{" "}
      <strong>prediction</strong> on a two-dimensional data set.
    </p>
    <p
      style={{
        backgroundColor: "#EEE",
        padding: "16px",
      }}
    >
      <div>
        You may be wondering why the squared error is taken. Directly summing
        the error won't work, for example consider the following graph, which
        has a summed error of zero, but the fitted line is not particularly
        insightful.
      </div>
      <p>PLACEHOLDER</p>
      <div>
        However, squaring the error is not the only way to mitigate this
        problem. The absolute value of the error could be taken, for example.{" "}
        <MathJax tex="RSS" /> is chosen due to some numerical properties that
        make it easy to work with. Recall in{" "}
        <a href="/gradient-descent/">gradient descent</a> that certain learning
        rates cause the algorithm to not converge. For reasons beyond the scope
        of this text, <MathJax tex="RSS" /> causes various optimization
        algorithms to converge much more nicely than other options.
      </div>
    </p>
    <p>
      In order to optimize the prediction, the parameters <MathJax tex="a" />{" "}
      and <MathJax tex="b" /> are chosen to minimize the total error. Let's
      implement this with gradient descent.
    </p>
    <hr />
    <p>
      First, implement the residual sum of squares error for a given dataset.
    </p>
    <Python
      initialContent={problems.a}
      solution={solutions.a}
      evaluations={[]}
    />
    <p>
      Next, compute the gradient for the residual sum of squares. Recall the{" "}
      <MathJax tex="n" />
      -dimensional gradient consists of the partial deriatives in each of the
      dimensions. Therefore, the gradient for the residual sum of squares for a
      two-dimensional regression consists of the partial derivatives
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="\frac{\partial RSS}{\partial a}, \frac{\partial RSS}{\partial b}" />
    </p>
    <p>If you need a hint, click the hint tab.</p>
    <Python
      initialContent={problems.b}
      solution={solutions.b}
      evaluations={[]}
    />
    <p>
      Now that the gradient is implemented, we'll optimize the two parameters by
      calling <code>gradient_descent()</code>, which we wrote in the last
      chapter. Write a function, <code>linear_regression()</code>, that takes in
      data and returns <MathJax tex="a" /> and <MathJax tex="b" /> that best fit
      the data. When your code runs, a plot will also appear to visualize the
      algorithm in action.
    </p>
    <Python
      initialContent={problems.c}
      solution={solutions.c}
      evaluations={[]}
    />
    <p>
      With this implementation of <code>linear_regression()</code>, we are now
      able to infer data and use the function to predict values. In the problem
      set, we'll dive deeper and explore this idea of predictions, but for now
      let's continue on to logistic regressions.
    </p>
    <hr />
    <h2>Logistic Regressions</h2>
    <p>
      While linear regressions allow the prediction of <em>continuous space</em>{" "}
      from <MathJax tex="-\infty" /> to <MathJax tex="\infty" />, the output may
      not always be in this range. For example, if we wish to build a model of
      probabilities, or a <strong>binary classifier</strong>, the output is only
      in the range from <MathJax tex="0" /> to <MathJax tex="1" />. With a
      standard linear regression, however, the regression line's predictions are
      not restricted to <MathJax tex="0" /> and <MathJax tex="1" />.
    </p>
    <p>
      Play around with the data to the right and identify points that the linear
      regression produces invalid output for.
    </p>
    <p>PLACEHOLDER</p>
    <p>
      To solve this problem, observe that the regression line doesn't have to be
      linear and can instead be curved. In fact, in our gradient descent
      implementation of <code>linear_regression()</code>, we had no requirement
      for the underlying regression line to be linear. A common choice for such
      a curve is the <strong>logistic curve</strong>. If you have read about
      neural networks before, this is the most common implementation of a{" "}
      <strong>sigmoid function</strong>.
    </p>
    <p>
      Set the fit to a logistic curve to see how the curve fits the data. With a
      logistic curve, the output is bounded between <MathJax tex="0" /> and{" "}
      <MathJax tex="1" />, so the regression line will no longer predict invalid
      outputs.
    </p>
    <p>
      Luckily, the implementation of the logistic curve is reasonably simple. It
      is computed as a function of the linear regression curve{" "}
      <MathJax tex="y=ax+b" />, specifically by performing the transformation
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="S(y) = \frac{1}{1 + e^{-y}} = \frac{1}{1 + e^{-ax - b}}" />
    </p>
    <p>
      Under this transformation, the logistic regression <MathJax tex="RSS" />{" "}
      error is equal to
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="RSS_{logistic} = \sum_i^n \epsilon_i^2 = \sum_i^n (y_i - S(ax_i + b))^2" />
    </p>
    <p>
      This error has two free parameters, <MathJax tex="a" /> and{" "}
      <MathJax tex="b" />, that can be optimized via gradient descent. Compute
      the partial derivatives and implement logistic regression similar to how
      linear regression is implemented.
    </p>
    <Python
      initialContent={problems.d}
      solution={solutions.d}
      evaluations={[]}
    />
    <p>
      In the above problem, the linear regression line is transformed to a
      logistic curve. You might be wondering why specifically the logistic curve
      was used to do this mapping. There are, in fact, quite a few sigmoid
      functions that can also be used for this mapping. Logistic curves have
      some desirable mathematical properties, but aren't the only curves that
      can be used. Nevertheless, this text will continue to use them in the
      spirit of continuing with the bare minimum needed to implement a neural
      network.
    </p>
    <p>
      Next up, we'll encapsulate logistic regressions into a perceptron, the
      smallest unit of a neural network.
    </p>
    <div>
      <ul>
        <li>
          <Link to="/fundamentals/perceptrons/">Continue to Perceptrons</Link>
        </li>
        <li>
          <Link to="/">Go back to the table of contents</Link>
        </li>
      </ul>
    </div>
  </Layout>
);
