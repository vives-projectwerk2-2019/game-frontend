const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
        exclude: /(dist|node_modules|bower_components)/,
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
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': {
        MQTT_BROKER_HOST: JSON.stringify(process.env.MQTT_BROKER_HOST),
        MQTT_BROKER_PORT: JSON.stringify(process.env.MQTT_BROKER_PORT),
        MQTT_BROKER_PATH: JSON.stringify(process.env.MQTT_BROKER_PATH),
        MQTT_BROKER_USE_SSL: JSON.stringify(process.env.MQTT_BROKER_USE_SSL)
      }
    })
  ],
  optimization: {
    // splitChunks: {
    //   chunks: 'all'
    // },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
}