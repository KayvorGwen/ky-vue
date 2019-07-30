    
const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
const Px2remWebpackPlugin = require('px2rem-webpack-plugin')

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production'
    //   ? '//your_url'
    //   : '/',
  
    // outputDir: 'dist',
  
    // assetsDir: 'static',

    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  
    filenameHashing: true,
  
    // When building in multi-pages mode, the webpack config will contain different plugins
    // (there will be multiple instances of html-webpack-plugin and preload-webpack-plugin).
    // Make sure to run vue inspect if you are trying to modify the options for those plugins.
    // pages: {
    //   index: {
    //     // entry for the pages
    //     entry: '',
    //     // the source template
    //     template: 'public/index.html',
    //     // output as dist/index.html
    //     filename: 'index.html',
    //     // when using title option,
    //     // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    //     title: '首页',
    //     // chunks to include on this pages, by default includes
    //     // extracted common chunks and vendor chunks.
    //     chunks: ['chunk-vendors', 'chunk-common', 'index']
    //   }
    //   // when using the entry-only string format,
    //   // template is inferred to be `public/subpage.html`
    //   // and falls back to `public/index.html` if not found.
    //   // Output filename is inferred to be `subpage.html`.
    //   // subpage: ''
    // },
  
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
  
    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,
  
    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [],
  
    // 生产环境 sourceMap
    productionSourceMap: false,
  
    // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
    // corsUseCredentials: false,
    // webpack 配置，键值对象时会合并配置，为方法时会改写配置
    // https://cli.vuejs.org/guide/webpack.html#simple-configuration
    configureWebpack: (config) => {
      config.resolve = {
        extensions: ['.js', '.vue', '.json',".css", ".ts", "less"],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src')
        }
      };
      // 自动将px转换成rem
      config.plugins.push(new Px2remWebpackPlugin({originScreenWidth: 375}));
    },
  
    // webpack 链接 API，用于生成和修改 webapck 配置
    // https://github.com/mozilla-neutrino/webpack-chain
    chainWebpack: (config) => {
      config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        });
        return options;
      });
    },
  
    // 配置高于chainWebpack中关于 css loader 的配置
    css: {
      // 是否开启支持 foo.module.css 样式
      modules: false,
  
      // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
      extract: true,
  
      // 是否构建样式地图，false 将提高构建速度
      sourceMap: false,
  
      // css预设器配置项
      loaderOptions: {
        css: {
          // options here will be passed to css-loader
        },
  
        postcss: {
          // options here will be passed to postcss-loader
        }
      }
    },
  
    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
      open: true,
      // host: '127.0.0.1',
      // host: 'localhost',
      // host: '192.168.6.10',
      host: '0.0.0.0',
      port: 5000,
      https: false,
      hotOnly: false,
  
      // proxy: {
      //   '/api': {
      //       target: 'http://192.168.6.10:3000',  //目标接口域名
      //       changeOrigin: true,  //是否跨域
      //       pathRewrite: {
      //         '^/api': '/api'   //重写接口
      //       }
      //   }
      // },
  
      before: app => {
      }
    },
    // 是否为 Babel 或 TypeScript 使用 thread-loader
    parallel: require('os').cpus().length > 1,
  
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
  
    // 第三方插件配置
    pluginOptions: {}
}