/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'cdROma.me',
    links: [
      { id: '000', name: 'github', url: 'https://share.cdroma.me/hnXii' },
      { id: '001', name: 'codepen', url: 'https://share.cdroma.me/3CBJx' },
      { id: '002', name: 'producthunt', url: 'https://share.cdroma.me/KBpLg' },
      { id: '003', name: 'buymeacoffee', url: 'https://share.cdroma.me/49i29' },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-emotion',
    'gatsby-plugin-dark-mode',
    'gatsby-plugin-pnpm',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'GatsbyJS',
        short_name: 'GatsbyJS',
        start_url: '/',
        display: 'standalone',
        icon: 'src/assets/sun.png',
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
  pathPrefix: '/',
};
