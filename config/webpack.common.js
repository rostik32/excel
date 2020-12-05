const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [paths.src + '/index.js'],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': paths.src,
      '@core': paths.src + '/core',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.src + '/template.html',
      favicon: paths.src + '/images/favicon.png',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
};
