const path = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader', 'eslint-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  devServer: {
    publicPath: "/dist/",
    contentBase: "public",
    historyApiFallback: true
  },
  plugins: [
    new DashboardPlugin()
  ]
}

module.exports = config
