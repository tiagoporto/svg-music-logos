/*
* Swill Boilerplate v1.0.0beta
* https://github.com/tiagoporto/swill-boilerplate
* Copyright (c) 2014-2017 Tiago Porto (http://tiagoporto.com)
* Released under the MIT license
*/

const path = require('path')
const config = require('./.swillrc.json')
const webpack = require('webpack')
const paths = config.basePaths

module.exports = {
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
  entry: path.join(__dirname, paths.src, 'index.js'),
  output: {
    path: path.resolve(__dirname, paths.src),
    filename: 'bundle.js'
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
      }, {
        test: /\.vue$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'vue-loader',
          options: {
            cacheDirectory: true
          }
        }
      }, {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')(config.autoprefixerBrowsers)
              ]
            }
          },
          'stylus-loader'
        ]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
