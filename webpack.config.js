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
    }]
  },
  devServer: {
    contentBase: 'public'
  },
  plugins: [
    new DashboardPlugin()
  ]
}

module.exports = config
