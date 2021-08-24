const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require('path');

module.exports = {
    mode: "development",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.js$/g,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
      ]
    },
    plugins: [new MiniCssExtractPlugin()],
    devtool: "source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, './dist')
      },
      hot: true
    }
}
