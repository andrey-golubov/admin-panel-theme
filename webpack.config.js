/* Libs */
const path = require('path');
const webpack = require('webpack');
/* Webpack plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextWebpackPlugin("css/[name].css")

const production = process.argv.indexOf('-p') !== -1 ? 'production' : false;

const config = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module:{
    rules: [
      {
        test: /.\jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?sourceMap=true!sass-loader',
        }),
      }
    ]
  },
  resolve: {
    alias: {
      "Root": path.resolve(__dirname, "src"),
      "Styles": path.resolve(__dirname, "src", "scss")
    }
  },
  devtool: production ? false : 'source-map',
  watch: production,
  devServer: {
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(production)
    }),
    extractSass
  ]
}

module.exports = config;
