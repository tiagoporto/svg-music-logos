const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const webpackConfig = {
  devServer: {
    open: true,
    overlay: true,
    watchContentBase: true,
    contentBase: [path.join(__dirname, 'public')]
  },
  devtool: 'source-map',
  entry: {
    app: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name][hash].bundle.js'
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
                // require('autoprefixer')(config.autoprefixerBrowsers),
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
        vendors: {
          test: /node_modules/,
          chunks: 'initial',
          filename: '[name][hash].bundle.js',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
}

module.exports = webpackConfig

module.exports = (env, { mode }) => {
  const isProd = mode === 'production'

  if (isProd) {
    webpackConfig.optimization.minimize = true
    webpackConfig.plugins.push(
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode
      })
    )
  }
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())

  webpackConfig.output.path = path.join(__dirname, 'dist/js')

  return webpackConfig
}
