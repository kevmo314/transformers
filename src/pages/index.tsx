import React from "react";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <p>Hi, I'm Kevin.</p>
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
      basic <strong>linear algebra</strong> (think matrix multiplication) and
      some basic <strong>python</strong>.
    </p>
    <p>
      In addition to problems included in each of the chapters, each section
      will include a problem set. This will cover all the topics in a
      project-like setting.
    </p>
    <div>
      <h2>Fundamentals</h2>
      <ol>
        <li>
          <Link to="/gradient-descent/">Gradient Descent</Link>
        </li>
        <li>
          <Link to="/regressions/">Regressions</Link>
        </li>
        <li>Neurons</li>
        <li>Problem Set</li>
      </ol>
      <h2>Networks</h2>
      <ol>
        <li>Networks of Neurons</li>
        <li>Recurrent Neural Networks</li>
        <li>Encoders and Decoders</li>
        <li>Problem Set</li>
      </ol>
      <h2>Transformers</h2>
      <ol>
        <li>Attention</li>
        <li>Transformers</li>
        <li>Encoders and Decoders</li>
        <li>Problem Set</li>
      </ol>
      <hr />
      <h2>Problems and Optimizations</h2>
      <ol>
        <li>Improving Gradient Descent</li>
        <li>Improving Backpropagation</li>
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
