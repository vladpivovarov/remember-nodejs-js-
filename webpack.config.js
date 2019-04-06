
const webpack = require("webpack");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  output: {
    publicPath: "./public/",
    filename: "main.js"
  },
  plugins: [
    // new UglifyJsPlugin({
    //     sourceMap: true
    // }),
    new webpack.ProvidePlugin({
      // подключаются только если используется:
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin("../../assets/style/foundation.css")
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {"presets": ["env"]},
      },
      {
        test:/\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "sass-loader"],
        }),
      },
      {
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader",
        })
      }
    ]
  }
}
