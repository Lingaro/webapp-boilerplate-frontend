const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const PROD = (process.env.NODE_ENV === 'production');
if (PROD) {
  console.log("Production build");
}
const config = {
  mode: PROD ? 'production' : 'development',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    filename: '[name].[hash:8].js'
  },
  performance: {
    maxEntrypointSize: 512000
  },
  plugins: [
    // common plugins
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new GitRevisionPlugin(),
  ].concat(PROD ? [
    // prod only plugins:
    new BabiliPlugin(),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ] : [ /* dev only plugins: */ new webpack.NamedModulesPlugin()]),
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: PROD ? undefined : {
          // skip full typechecking in dev-server mode:
          // this greatly improves reload times.
          // typechecking is done in paraller via start:tsc
          transpileOnly: true,
          compilerOptions: {
            skipLibCheck: true,
            isolatedModules: true
          }
        },
      },
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