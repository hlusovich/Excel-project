const path = require('path');
const HtmlWebackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', '/index.js'],
  output: {
    filename: isDev ? 'bundle.[hash].js' : 'bundle.js',
    path: path.resolve(__dirname, 'dist'),

  },
  devServer: {
    port: 4200,
    hot: isDev,
    watchContentBase: isDev,
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      }],

    }),
    new MiniCssExtractPlugin(
        {filename: 'bundle.[hash].css'}
    ),
  ],
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],

      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader', {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        }],
      },
    ],
  },


};

