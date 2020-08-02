import React from "react";

import Layout from "../../../components/Layout";
import SEO from "../../../components/SEO";
import MathJax from "../../../components/MathJax";
import Python from "../../../components/Python";
import problems from "../../../python/fundamentals/problem-set/problems";
import solutions from "../../../python/fundamentals/problem-set/solutions";
import { Link } from "gatsby";

export default () => (
  <Layout>
    <SEO title="Fundamentals: Problem Set" />
    <h1>Fundamentals: Problem Set</h1>
    <p>
      In this problem set, we'll investigate extending perceptrons to work with
      arbitrary input shapes. In the text, <MathJax tex="a" /> and{" "}
      <MathJax tex="b" /> were confined to floats and the <MathJax tex="RSS" />{" "}
      involved a sum, but when operating in vector space, this sum can be
      removed.
    </p>
    <p
      style={{
        backgroundColor: "#EEE",
        padding: "16px",
      }}
    >
      These problem sets are expected to take substantially more time than the
      text itself. If it helps, copy the code to your favorite editor and work
      on the problem from there. Click the Export button to export the tests for
      evaluation on your own computer.
    </p>
    <hr />
    <p>
      Problem 1. Update gradient descent to work with <em>n</em>-dimensional
      inputs. The function now takes a <code>numpy.ndarray</code> and should
      return a <code>numpy.ndarray</code> where the local minimum is.
    </p>
    <Python
      hiddenContent=""
      initialContent={problems.a}
      solution={solutions.a}
      evaluations={[]}
    />
    <hr />
    <p>
      Problem 2. Update a perceptron to work with a matrix of weights. A single
      perceptron may output a dimension different from its input.
    </p>
    <p>PLACEHOLDER</p>
    <hr />
    <p>
      Problem 3. Using this <em>n</em>-dimensional perceptron, write a
      classifier for the{" "}
      <a
        href="http://archive.ics.uci.edu/ml/datasets/Wine+Quality"
        target="_blank"
      >
        Wine Quality
      </a>{" "}
      dataset. The basic scaffolding has been provided for you to read the data.
      Chain together multiple <em>n</em>-dimensional perceptrons to output a
      single score predicting the wine quality. Find a configuration of
      perceptrons that results in at least a 95% accuracy.
    </p>
    <p>PLACEHOLDER</p>
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
