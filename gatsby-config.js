/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'cdROma.ru',
    links: [
      { id: '001', name: 'github', url: 'https://vk.cc/asTUrW' },
      { id: '002', name: 'twitter', url: 'https://vk.cc/asTUtC' },
      { id: '003', name: 'codepen', url: 'https://vk.cc/asTUve' },
      { id: '004', name: 'patreon', url: 'https://vk.cc/asTUxm' }]
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
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
  pathPrefix: '/gthrm.github.io'
};