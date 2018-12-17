const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './index',
    'main.min': './index',
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.ts'],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.ts?$/,
        loader: 'tslint-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
  performance: { hints: false },
  mode: 'development',
  // mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          failOnHint: true,
          configuration: require('./tslint.json'),
        },
      },
    }),
  ],
};
