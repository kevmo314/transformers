import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Header from "./Header";
import "./layout.css";
import styled from "@emotion/styled";
import { FaGithub } from "react-icons/fa";

const Body = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
`;

const Copyright = styled.div`
  flex: 1 1 auto;
`;

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
      <Body>
        <main>{children}</main>
        <hr />
        <Footer>
          <Copyright>
            © {new Date().getFullYear()}, Kevin Wang. Notice a mistake,
            something unclear, or other comments?{" "}
            <a href="mailto:kevmo314@gmail.com">Email me!</a>
          </Copyright>
          <a href="https://github.com/kevmo314/transformers" target="_blank">
            <FaGithub />
          </a>
        </Footer>
      </Body>
    </>
  );
};
