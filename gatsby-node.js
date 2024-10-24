/* eslint-disable no-restricted-syntax */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

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

exports.createPages = async ({ graphql, actions }) => {
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

  for await (const { node } of result.data.allMarkdownRemark.edges) {
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
