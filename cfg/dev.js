const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const product = process.env.product;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  debug: true,
  entry: {
    app: [
      'webpack-dev-server/client?http://127.0.0.1:8000',
      'webpack/hot/only-dev-server',
      './' + product + '/src/index',
    ],
  },
  output: {
    path: path.join(__dirname, '../dist/' + product + '/assets'),
    filename: '[name]-[hash].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEVELOPMENT__: true
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../' + product + '/src/index.html'),
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  postcss() {
    return [precss, autoprefixer];
  },

  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loaders: ['url?limit=8192'],
        exclude: /node_modules/
      }
    ]
  },
};
