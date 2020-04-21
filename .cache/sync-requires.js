const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-blog-post-js": hot(preferDefault(require("/Users/redevice/Documents/GitHub/gthrm.github.io/src/templates/blog-post.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/redevice/Documents/GitHub/gthrm.github.io/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/redevice/Documents/GitHub/gthrm.github.io/src/pages/index.js"))),
  "component---src-pages-my-files-js": hot(preferDefault(require("/Users/redevice/Documents/GitHub/gthrm.github.io/src/pages/my-files.js")))
}

