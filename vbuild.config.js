const path = require('path')

module.exports = options => ({
  entry: 'src/index.js',
  postcss: [
    // add more postcss plugins here
    // by default we have autoprefixer pre added
  ],
  html: {
    template: 'static/index.html'
  },
  webpack(config) {

    return config
  }
})
