import React from 'react';

import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/react';

const styledContainer = css`
  margin: 0;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 16px;
  border-top: 1px solid var(--textNormal);

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

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
        `,
  );

  return (
    <ul
      css={styledContainer}
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
        ),
      )}

    </ul>
  );
}
