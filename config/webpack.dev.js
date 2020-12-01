const paths = require('./paths');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',

	devtool: 'inline-source-map',

	devServer: {
		contentBase: paths.build,
		open: true,
		hot: true,
		inline: true,
		compress: true,
		port: 8080,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					'eslint-loader'
				]
			}
		],
	},

	plugins: [new webpack.HotModuleReplacementPlugin()],
});
