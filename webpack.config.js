const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // entry: "./app.js",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }, 
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  stats: {
      colors: true
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv()
  ]
}