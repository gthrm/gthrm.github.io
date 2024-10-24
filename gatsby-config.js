/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const PAGE_TITLE = "Roman's Blog - Frontend Engineer, Specialty Coffee Enthusiast, and Creator";

require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'cdROma.me',
    siteUrl: 'https://cdroma.me',
    pageTitle: PAGE_TITLE,
    description: 'Join me, Roman, on my journey as a frontend engineer, where I explore the realms of web development, share my passion for specialty coffee, and showcase my creative projects.',
    keywords: "Roman, frontend development, web design, JavaScript, React, Vue, CSS, HTML, programming, coding, software engineering, developer tips, tech blog, coding tutorials, specialty coffee, coffee brewing, coffee culture, personal projects, creative coding, technology insights, web development blog, software development, coding lifestyle, programming insights, IT blog, front-end techniques, modern web technologies, coffee enthusiast, project showcase, technology trends, frontend engineer, web development tips, personal development, technology blog, developer's journey, coding experiences, web innovation, digital creativity",
    links: [
      { id: '000', name: 'github', url: 'https://share.cdroma.me/hnXii' },
      { id: '001', name: 'codepen', url: 'https://share.cdroma.me/3CBJx' },
      { id: '002', name: 'producthunt', url: 'https://share.cdroma.me/KBpLg' },
      { id: '004', name: 'ko-fi', url: 'https://share.cdroma.me/q9SBM' },
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
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: PAGE_TITLE,
        short_name: 'cdROma.me',
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
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Lato:400,700',
          'limelight',
          'source sans pro:300,400,400i,700',
        ],
        display: 'swap',
      },
    },
  ],
  pathPrefix: '/',
};
