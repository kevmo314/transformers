import { Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <p>
      Hi, I'm Kevin. I've been looking for an end-to-end guide for how to build
      a transformer network from absolute scratch, but I haven't been able to
      find anything super accessible. So I decided to write one.
    </p>
    <p>
      <strong>Journey to Transformers</strong> explains all the concepts that
      build up to the state-of-the-art transformer neural network. No magic
      abstractions or libraries, we'll cover everything from the ground up. This
      course is not intended to be a general machine learning course. It is
      solely focused on neural networks and their construction and is intended
      is be <em>just enough</em> content to build a complex neural network.
    </p>
    <p>
      A couple prerequisites are necessary, however. You'll need to know some
      basic <strong>linear algebra</strong> (think matrix multiplication),{" "}
      <strong>calculus</strong> (partial derivatives and computing them), and
      some basic <strong>python</strong>. Later chapters will use numpy, but in
      earlier chapters we will build everything from scratch.
    </p>
    <p>
      In addition to problems included in each of the chapters, each section
      will include a problem set. This will cover all the topics in a
      project-like setting. Overall, while the goal of this course is not to be
      a thorough reference of all the topics, in order to gain a solid
      understanding of the fundamentals, it is recommended to dedicate at least
      ten to twenty hours of study per section. Additionally, to make the most
      out of the content, it is recommended to read this text on a laptop or
      desktop in order to be able to complete the coding problems.
    </p>
    <div>
      <h2>Fundamentals</h2>
      <ol>
        <li>
          <Link to="/fundamentals/gradient-descent/">Gradient Descent</Link>
        </li>
        <li>
          <Link to="/tba/">Regressions</Link>
        </li>
        <li>
          <Link to="/tba/">Perceptrons</Link>
        </li>
        <li>
          <Link to="/tba/">Problem Set</Link>
        </li>
      </ol>
      <h2>Growing the Network</h2>
      <ol>
        <li>Neural Networks</li>
        <li>Deep Neural Networks</li>
        <li>Recurrent Neural Networks</li>
        <li>Problem Set</li>
      </ol>
      <h2>Reaching the Summit</h2>
      <ol>
        <li>Attention</li>
        <li>Transformers</li>
        <li>Encoders and Decoders</li>
        <li>Problem Set</li>
      </ol>
      <hr />
      <h2>The Scenic Route</h2>
      <ol>
        <li>Activation Functions</li>
        <li>Hyperparameters</li>
        <li>Problem Set</li>
      </ol>
      <h2>Beyond Transformers</h2>
      <ol>
        <li>Convolutional Neural Networks</li>
        <li>Problem Set</li>
      </ol>
    </div>
  </Layout>
);

export default IndexPage;
