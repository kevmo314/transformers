import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Header from "./Header";
import "./layout.css";

export default ({ children }: React.PropsWithChildren<{}>) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <hr />
        <footer>
          © {new Date().getFullYear()}, Kevin Wang. Notice a mistake, something
          unclear, or other comments?{" "}
          <a href="mailto:kevmo314@gmail.com">Email me!</a>
        </footer>
      </div>
    </>
  );
};
