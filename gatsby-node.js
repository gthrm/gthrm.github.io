/* eslint-disable no-restricted-syntax */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { GitalkPluginHelper } = require('gatsby-plugin-gitalk');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions, getNode }) => {
  const { createPage } = actions;
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                title
                description
                keywords
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `);
  const site = getNode('Site');
  const { siteMetadata: { siteUrl } } = site;

  for await (const { node } of result.data.allMarkdownRemark.edges) {
    const personalToken = process.env.GITALK_CREATE_ISSUE_TOKEN;

    if (personalToken) {
      const issueOptions = {
        id: node.id,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        url: siteUrl,
        repo: process.env.GITALK_REPO,
        owner: process.env.GITALK_OWNER,
        personalToken: process.env.GITALK_CREATE_ISSUE_TOKEN,
      };
      await GitalkPluginHelper.createIssue(issueOptions);
    }

    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/blog-post.jsx'),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  }
};
