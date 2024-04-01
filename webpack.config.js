const config = require('./config.json')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const webpackConfig = {
  devServer: {
    open: true,
    overlay: true,
    watchContentBase: true,
    contentBase: [path.join(__dirname, config.basePaths.public)],
  },
  devtool: 'source-map',
  entry: {
    app: path.join(__dirname, config.basePaths.src + 'index.js'),
  },
  output: {
    path: path.join(__dirname, config.basePaths.public),
    filename: '[name].[hash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.vue$/,
        // exclude: /(node_modules)/,
        use: {
          loader: 'vue-loader',
          options: {
            cacheDirectory: true,
          },
        },
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
              plugins: (loader) => [
                require('autoprefixer')(config.basePaths.autoprefixerBrowsers),
                require('postcss-easing-gradients'),
              ],
            },
          },
          'stylus-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')(config.basePaths.autoprefixerBrowsers),
                require('postcss-easing-gradients'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: config.basePaths.images,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.common.js',
    },
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendors',
          filename: '[name].[hash].bundle.js',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new LodashModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: config.basePaths.public + 'index.html',
    }),
  ],
}

module.exports = webpackConfig

module.exports = (env, { mode }) => {
  const isProd = mode === 'production'

  if (isProd) {
    webpackConfig.optimization.minimize = true
    webpackConfig.plugins.push(
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode,
      }),
    )
    delete webpackConfig.devtool
  }

  webpackConfig.output.path = path.join(__dirname, config.basePaths.dist)

  return webpackConfig
}
