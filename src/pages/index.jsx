/* eslint-disable max-len */
import React from 'react';
import { Link, graphql } from 'gatsby';

import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { rhythm } from '../utils/typography';
import Layout from '../components/layout';
import avatar from '../assets/avatar.jpg';
import avatarAvif from '../assets/avatar.avif';
import avatarWebp from '../assets/avatar.webp';
import SpecialOffer from '../components/special-offer';

const styledHeaderWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const styledAvatar = css`
  font-size: 10px;
  color: var(--bg);
  margin-bottom: 0;
  min-width: ${rhythm(2.6)};
  height: ${rhythm(2.6)};
  border-radius: 50%;

  @media (max-width: 420px) {
    min-width: ${rhythm(2)};
    height: ${rhythm(2)};
  }
`;

const styledHeader = css`
  display: inline-block;
  margin: 0;

  @media (max-width: 420px) {
    font-size: ${rhythm(1)};
  }
`;

const styledLink = css`
  text-decoration: none;
  color: inherit;
`;

const styledLinkHeader = css`
  font-size: ${rhythm(1)};
  margin-bottom: ${rhythm(0.5)};

  @media (max-width: 420px) {
    font-size: ${rhythm(0.8)};
  }
`;

const styledSpecialOfferHeader = css`
  font-size: ${rhythm(1)};
  margin: 0;
  text-wrap: balance;
  text-align: center;

  @media (max-width: 420px) {
    font-size: ${rhythm(0.7)};
  }
`;

const styledCounter = css`
  margin: 0;
`;

const styledLinkHeaderDate = css`
  color: #bbb;
`;

const styledTimeToRead = css`
  color: #bbb;
  font-size: 13px;
`;

const styledBio = css`
  font-size: ${rhythm(0.8)};
  padding: ${rhythm(0.7)};
  margin: ${rhythm(0.7)} 0;
  border-bottom: 4px dotted var(--textLink);
  border-top: 4px dotted var(--textLink);

  @media (max-width: 420px) {
    font-size: ${rhythm(0.7)};
  }
`;

const highlightedText = css`
  color: var(--textLink);
  font-weight: 700;
`;

const styledFeatures = css`
    margin-top: ${rhythm(0.8)};
    text-align: start;
`;

export default function App({ data }) {
  return (
    <Layout>
      <Helmet>
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta name="keywords" content={data.site.siteMetadata.keywords} />
        <link rel="canonical" href={data.site.siteMetadata.siteUrl} />
        <meta property="og:title" content={data.site.siteMetadata.title} />
        <meta property="og:description" content={data.site.siteMetadata.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.site.siteMetadata.title} />
        <meta name="twitter:description" content={data.site.siteMetadata.description} />
        <title>{data.site.siteMetadata.pageTitle}</title>
      </Helmet>
      <main>
        <div css={styledHeaderWrapper}>
          <div>
            <h1 css={styledHeader}>Roman&#39;s Blog</h1>
            <h4 css={styledCounter}>
              {`${data.allMarkdownRemark.totalCount} Notes`}
            </h4>
          </div>
          <picture>
            <source
              srcSet={avatarAvif}
            />
            <source
              srcSet={avatarWebp}

            />
            <img loading="lazy" src={avatar} alt="Roman" css={styledAvatar} />
          </picture>

        </div>
        <div css={styledBio}>
          <span>
            Hello!
            {' '}
            <span css={highlightedText}>I&apos;m Roman 👋</span>
          </span>
          <br />
          <span>I write frontend 👨‍💻. Do some pet projects 🛠️. Make delicious food 🍲.</span>
          <br />
          <span>Enjoy touching grass 🌿.</span>
          <br />
          <span>Against Clean code! With a passion 🔥</span>
          <br />
          <span>Feature first matters 🚀.</span>
          <br />
        </div>
        <SpecialOffer external to="https://t.me/SrpskiPrijateljBot" target="_blank">
          <h3 css={styledSpecialOfferHeader}>
            <span aria-label="Srpski Prijatelj Bot" role="img">
              🤖
            </span>
            {' '}
            <span>Quickly translate from Serbian to Russian and back using my new Telegram bot.</span>
            <ul css={styledFeatures}>
              <li>Text from images</li>
              <li>Regular text</li>
              <li>And convert it into speech with just a few clicks</li>
            </ul>

            <b>Srpski Prijatelj Bot</b>
            {' '}
            <span aria-label="Click" role="img">
              👈
            </span>
          </h3>
        </SpecialOffer>
        <SpecialOffer to="/quizlet-lister">
          <h3 css={styledSpecialOfferHeader}>
            <span aria-label="Studding" role="img">
              🧑‍🎓
            </span>
            {' '}
            Learn foreign language words easily with my new Chrome extension -
            {' '}
            <b>Quizlet Lister</b>
            {' '}
            <span aria-label="Click" role="img">
              👈
            </span>
          </h3>
        </SpecialOffer>

        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug} css={styledLink}>
              <h3 css={styledLinkHeader}>
                {node.frontmatter.title}
                {' '}
                <span css={styledLinkHeaderDate}>
                  —
                  {' '}
                  {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
              <p css={styledTimeToRead}>
                {`Time to read: ${node.timeToRead}  min.`}
              </p>
            </Link>
          </div>
        ))}

      </main>
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        pageTitle
        description
        keywords
        siteUrl
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "main" }, lang: { eq: "eng" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            type
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
          timeToRead
        }
      }
    }
  }
`;

App.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        pageTitle: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        keywords: PropTypes.string.isRequired,
        siteUrl: PropTypes.string.isRequired,
      }),
    }),
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              type: PropTypes.string,
            }).isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
            excerpt: PropTypes.string.isRequired,
            timeToRead: PropTypes.number.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
