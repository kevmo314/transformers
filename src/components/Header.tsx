import { Link } from "gatsby";
import React from "react";

export default ({ siteTitle }: { siteTitle: string }) => (
  <header
    style={{
      background: `#f7a046`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
            textShadow: `2px 2px 2px black`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);
