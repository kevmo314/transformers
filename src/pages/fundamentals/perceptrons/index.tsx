import React from "react";
import Layout from "../../../components/Layout";
import SEO from "../../../components/SEO";
import MathJax from "../../../components/MathJax";
import Python from "../../../components/Python";
import problems from "../../../python/fundamentals/perceptrons/problems";
import solutions from "../../../python/fundamentals/perceptrons/solutions";
import { Link } from "gatsby";

export default () => (
  <Layout>
    <SEO title="Perceptrons" />
    <h1>Perceptrons</h1>
    <p>
      From the previous chapter, we implemented a logistic regression solver
      using gradient descent. But this isn't enough to solve more complicated
      regression problems. For example, consider the following data set.
    </p>
    <p>PLACEHOLDER</p>
    <p>
      A logistic regression won't be able to model this data set effectively
      because it contains three separate "regions" of data. Instead, we can
      model this with the convolution of <em>two</em> logistic regressions. The
      final fit of the function is composed of a logistic regression feeding
      into the input of the next logistic regression. For now, don't worry too
      much about the details here. Instead, increase the number of logistic
      regressions to see how adding more logistic regressions can improve the
      fit of the data.
    </p>
    <p>
      The key idea is that logistic regressions can perform binary
      classification tasks, but when there are more than two categories, a
      composition of logistic regressions can better fit the data. Intuitively,
      each logistic regression that is added adds another "category" that the
      data can fall into, thus increasing the total number of categories
      available to be fit.
    </p>
    <hr />
    <p>
      Before we get too far, let's first encapsulate the behavior of a logistic
      regression into a single class. This class will be known as a{" "}
      <strong>perceptron</strong>. Implement the function{" "}
      <code>backpropagation()</code>, which performs a single step of gradient
      descent. Recall the formulas for the partial derivatives of{" "}
      <MathJax tex="RSS_{logistic}" /> from the previous chapter,
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="\frac{\partial RSS_{logistic}}{\partial a} = -2 \sum_i^n (y_i - S(\hat y_i)) S(\hat y_i) (1 - S(\hat y_i)) x_i" />
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="\frac{\partial RSS_{logistic}}{\partial b} = -2 \sum_i^n (y_i - S(\hat y_i)) S(\hat y_i) (1 - S(\hat y_i))" />
    </p>
    <Python
      initialContent={problems.a}
      solution={solutions.a}
      evaluations={[]}
    />
    <p>
      With a single perceptron, gradient descent can be implemented much more
      easily.
    </p>
    <p>PLACEHOLDER</p>
    <Python
      initialContent={problems.a}
      solution={solutions.a}
      evaluations={[]}
    />
    <p>
      To extend a single perceptron into multiple layers, consider what happens
      if one perceptron feeds into another. That is, the output{" "}
      <MathJax tex="\hat y" /> of <code>prediction()</code> of perceptron 1
      becomes the input <MathJax tex="x" /> of the next perceptron 2.
      Conceptually, this looks like
    </p>
    <p>PLACEHOLDER</p>
    <p style={{ textAlign: "center" }}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" />
          </marker>
        </defs>
        <line
          x1="90"
          y1="50"
          x2="200"
          y2="50"
          stroke="#000"
          markerEnd="url(#arrowhead)"
        />
        <circle cx="50" cy="50" r="25" stroke="black" fill="white" />
        <circle cx="250" cy="50" r="25" stroke="black" fill="white" />
      </svg>
    </p>
    <p>
      Mathematically, our output <MathJax tex="\hat y" /> becomes
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="\hat y = S(a_2 \times S(a_1 x + b_1) + b_2)" />
    </p>
    <p>
      Now, instead of two parameters, <MathJax tex="a" /> and{" "}
      <MathJax tex="b" />, gradient descent must optimize four parameters,{" "}
      <MathJax tex="a_1" />, <MathJax tex="b_1" />, <MathJax tex="a_2" />, and{" "}
      <MathJax tex="b_2" />. Luckily, the implementation of a perceptron makes
      this very easy to do via the <strong>backpropagation algorithm</strong>.
      Naming a single step of gradient descent <code>backpropagation()</code>{" "}
      wasn't just a coincidence!
    </p>
    <p>
      As before, the partial derivatives with respect to each of the four
      parameters can be computed. Compute and implement the partial derivatives.
      This step can be difficult, but spend some time manually calculating the
      derivatives on paper and implementing them. If you need a hint, click the
      hint tab.
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="RSS = \sum_i^n (y_i - S(a_2 \times S(a_1 x_i + b_1) + b_2))^2" />
    </p>
    <p>PLACEHOLDER</p>
    <hr />
    <p>
      With the computed partial derivatives, a pattern arises between them. If
      you peeked at the solution, it hints at this approach by defining common
      variables. Let's visualize this a little better. Given the final
      prediction
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="\hat y = S({\color{blue} a_2 \times S({\color{red} a_1 x_i + b_1}) + b_2})" />
    </p>
    <p>Define the following variables</p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="{\color{red} \alpha_i = a_1 x_i + b_1}" />
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="{\color{blue} \beta_i = a_2 S(\alpha_i) + b_2}" />
    </p>
    <p>and use the following notation</p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="S'(x) = \frac{\partial S(x)}{\partial x} = S(x) (1 - S(x))" />
    </p>
    <p>to simplify the partial derivatives</p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="\frac{\partial RSS}{\partial a_1} = -2 \sum_i^n {\color{green} (y_i - S(\beta_i)) S'(\beta_i)} S(\alpha_i)" />
    </p>
    <p style={{ textAlign: "center" }}>
      <MathJax tex="\frac{\partial RSS}{\partial a_2} = -2 \sum_i^n {\color{green} (y_i - S(\beta_i)) S'(\beta_i)} {\color{orange} a_1 S'(\alpha_i)} S(\beta_i)" />
    </p>
    <p>
      From this step, observe that the{" "}
      <span style={{ color: "green" }}>green</span> part of the equation remains
      constant from the first perceptron to the second. This is not a
      coincidence either, and if we were to consider a third perceptron, the{" "}
      <span style={{ color: "orange" }}>orange</span> part of the second
      perceptron's equation would be constant with the third too.
    </p>
    <p>
      We will call this growing portion of the equation the{" "}
      <strong>propagation factor</strong>, which is will propagate backwards
      through our network. Our backpropagation algorithm will thus become
    </p>
    <p>
      <ol>
        <li>
          Take as input the propagation factor from the previous perceptron.
        </li>
        <li>
          Compute the gradients for this perceptron based on the propagation
          factor and the input.
        </li>
        <li>
          Return the propagation factor times the weight <MathJax tex="a" /> and
          the derivative <MathJax tex="S'(x)" /> to be passed to the next
          perceptron.
        </li>
      </ol>
    </p>
    <p>
      Update the previous version of <code>backpropagation()</code> to take in a
      propagation factor as input and return the next propagation factor.
    </p>
    <p>PLACEHOLDER</p>
    <hr />
    <p>
      With this updated implementation, the perceptron can be used as follows.
    </p>
    <p>PLACEHOLDER</p>
    <p>
      And suddenly, we've created a <strong>multi-layer perceptron</strong>!
      Circling back to the start of this chapter, this two-layer perceptron can
      be used to classify objects into more categories than a standard logistic
      regression. Play around with the graph below, add some data points, and
      relish the fact we wrote this perceptron <em>from scratch</em>, not with
      an external machine learning library.
    </p>
    <p>PLACEHOLDER</p>
    <p>
      This is the end of the fundamentals section of this book. While these
      chapters covered multi-layer perceptrons with one dimension (
      <MathJax tex="a" /> and <MathJax tex="b" /> were just floats!) the problem
      set will have you implement the same logic with vectors and matrices. In
      the next section, <em>Growing the Network</em>, we'll expand beyond a line
      of perceptrons into full networks of neurons and tackle more complicated
      prediction problems.
    </p>
    <div>
      <ul>
        <li>
          <Link to="/fundamentals/problem-set/">Continue to Problem Set 1</Link>
        </li>
        <li>
          <Link to="/">Go back to the table of contents</Link>
        </li>
      </ul>
    </div>
  </Layout>
);
