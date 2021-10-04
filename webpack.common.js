const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: true
    }),
    new HtmlWebpackPlugin({
      template: './src/team.html',
      filename: 'team.html',
      minify: true
    }),
    new HtmlWebpackPlugin({
      template: './src/partials/nav.html',
      filename: 'partials/nav.html',
      minify: true,
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/home.html',
      filename: 'pages/home.html',
      minify: true,
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/standings.html',
      filename: 'pages/standings.html',
      minify: true,
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/teams.html',
      filename: 'pages/teams.html',
      minify: true,
      inject: false
    })
  ]
}
