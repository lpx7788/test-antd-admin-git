// var path = require('path')

// function resolve (dir) {
//   return path.join(__dirname, '..', dir)
// }

module.exports = {
  publicPath: '/',
  // assetsDir: "static",
  productionSourceMap: false,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '运营后台'
        return args
      })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#4d65fd',
            'link-color': '#4d65fd',
            'border-radius-base': '4px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        // '@': resolve('src')
      }
    }
  },
  devServer: {
    hot: true,
    port: 8080,
    open: false,
    proxy: {
      '/api': {
        target: 'http://192.168.0.233:8000/',
        // target: 'http://127.0.0.1:30000/',
        changeOrigin: true,
        ws: true,
        // pathRewrite: {
        //   '^/api': '/'
        // }
      },
    }
  }
};