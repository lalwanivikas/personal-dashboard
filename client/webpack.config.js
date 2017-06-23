const path = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin')

const API_ENDPOINT = 'http://localhost:3000' // API for Postgres db

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: [
        'babel-loader',
        'eslint-loader',
        {
          loader: 'string-replace-loader',
          query: {
            search: 'API_ENDPOINT',
            replace: API_ENDPOINT,
            flags: 'g'
          }
        }
      ]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  devServer: {
    publicPath: "/public/",
    contentBase: "public",
    historyApiFallback: true
  },
  plugins: [
    new DashboardPlugin()
  ]
}

module.exports = config
