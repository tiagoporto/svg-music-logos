const path = require('path')
const config = require('./.swillrc.json')
const webpack = require('webpack')
const paths = config.basePaths
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const webpackConfig = {
  devServer: {
    open: true,
    overlay: true,
    watchContentBase: true,
    hot: true,
    host: 'localhost',
    port: '8080',
    contentBase: [
      path.join(__dirname, paths.src),
      path.join(__dirname, paths.src, 'logos')
    ]
  },
  entry: {
    app: path.join(__dirname, paths.src, 'index.js')
  },
  output: {
    path: '',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.vue$/,
        // exclude: /(node_modules)/,
        use: {
          loader: 'vue-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                require('autoprefixer')(config.autoprefixerBrowsers),
                require('postcss-easing-gradients')
              ]
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'flags'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.common.js'
    }
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendors',
          enforce: true
        }
      }
    }
  },
  plugins: [new VueLoaderPlugin(), new webpack.HotModuleReplacementPlugin()]
}

module.exports = (env, {mode}) => {
  const isProd = mode === 'production'

  if (isProd) {
    webpackConfig.optimization.minimize = true
    webpackConfig.plugins.push(
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode
      })
    )
  }

  webpackConfig.output.path = path.resolve(
    __dirname,
    isProd ? paths.dist : paths.src
  )

  return webpackConfig
}
