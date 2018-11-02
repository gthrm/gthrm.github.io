import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';

export default function Footer() {
  const data = useStaticQuery(
    graphql`
          {
            site {
              siteMetadata {
                links {
                  id
                  name
                  url
                }
              }
            }
          }
        `
  );

  return (
    <ul
      css={css`
            @media (max-width: 420px) {
              display: block;
            }
            margin: 0;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid var(--textNormal);
          `}
    >
      {data.site.siteMetadata.links.map(
        (item) => (
          <li
            key={item.id}
            css={css`
            list-style-type: none;
            padding-top: 5px;
        `}
          >
            <a
              href={item.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span
                role="img"
                aria-label="Указатель"
              >
                👉
                {' '}
                {item.name}
              </span>
            </a>
          </li>
        )
      )}

    </ul>
  );
}
