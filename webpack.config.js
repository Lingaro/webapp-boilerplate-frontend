const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const PROD = (process.env.NODE_ENV === 'production');
if (PROD) {
  console.log("Production build");
}
const config = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    filename: '[name].[hash:8].js'
  },
  plugins: [
    // common plugins
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ].concat(PROD ? [
    // prod only plugins:
    new BabiliPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ] : [ /* dev only plugins: */ new webpack.NamedModulesPlugin()]),
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  devServer: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:8080"
    }
  }
}
module.exports = config;