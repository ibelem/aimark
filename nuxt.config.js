var resolve = require('path').resolve;

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Web AI Benchmark',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'all' },
      { name: 'author', content: 'Belem' },
      { name: 'keywords', content: 'ai, artificial inligence, machine learning, webml, Web ai, web machine learning, deep learning, tensorflow, tensorflow.js, tf.js, benchmark, web ai benchmark' },
      { hid: 'description', name: 'description', content: 'Web AI Benchmark' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    script: [
      // { src: 'https://bulma.io/lib/navbar.js' }
      // { src: 'https://use.fontawesome.com/releases/v5.1.0/js/all.js' , defer: false },
    ],
  },
  /*
  css: [
    // 加载一个 node.js 模块
    'hover.css/css/hover-min.css',
    // 同样加载一个 node.js 模块，不过我们定义所需的预处理器
    { src: 'bulma', lang: 'sass' },
    // 项目中的 CSS 文件
    '~assets/css/main.css',
    // 项目中的 Sass 文件
    { src: '~assets/css/main.scss', lang: 'scss' } // 指定 scss 而非 sass
  ],
  */
  css: [
    { src: '~/assets/css/main.scss', lang: 'scss'}
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      },
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    },
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  },
  modules: [
    // Or you can customize
    ['nuxt-buefy', { css: false, materialDesignIcons: true }],
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: 'rgba(222, 12, 101, 1.0)', height: '1px' },
  // loading: '~/components/loading.vue',
  /*
  ** Build configuration
  */

  plugins: [
    { src: '~/plugins/buefy.js', ssr: true },
    { src: '~/plugins/vue-chartjs.js', ssr: false },
    { src: '~/plugins/elm-chart.js', ssr: false },
  ],
  // babel: {
  //   "plugins": [["import", {
  //     "libraryName": "iview",
  //     "libraryDirectory": "src/components"
  //   }]]
  // },
  // vendor: ['axios', 'lodash', 'iview'],
  generate: {
    dir: resolve(__dirname, './public')
  },
  build: {
    /*
    ** Run ESLint on save
    */
    // publicPath: '/dist/',
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    filenames: {
      vendor: 'v.[hash].js',
      app: 'a.[chunkhash].js'
    },
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

