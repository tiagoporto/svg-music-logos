/*
* Swill Boilerplate v1.0.0beta
* https://github.com/tiagoporto/swill-boilerplate
* Copyright (c) 2014-2017 Tiago Porto (http://tiagoporto.com)
* Released under the MIT license
*/

const webpack = require('webpack')
const paths = require('./config.json')
const path = require('path')

const config = {
  entry: path.join(__dirname, paths.basePaths.src, paths.basePaths.scripts.src, 'index.js'),
  output: {
    path: path.resolve(__dirname, paths.basePaths.dest, paths.basePaths.scripts.dest),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery-svg-to-inline'),
        loader: 'imports-loader?$=jquery'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}

module.exports = config
