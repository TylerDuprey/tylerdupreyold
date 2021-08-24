var path = require('path');

module.exports = {
    mode: "development",
    module: {
      rules: [
        {
          test: /\.js$/g,
        },
        {
          exclude: /node_modules/
        },
        {
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    devtool: "source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, './dist')
      },
      liveReload: true
    }
}
