const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	output: {
		path: path.resolve(__dirname, '../build'),
		publicPath: './',
		filename: 'js/[name].[contenthash].bundle.js',
	},
	plugins: [
		// Extracts CSS into separate files
		// Note: style-loader is for development, MiniCssExtractPlugin is for production
		// Извлекать CSS в отдельные файлы
		// Обратите внимание, что style-loader предназначен для разработки, а MiniCssExtractPlugin - для продакшна
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css',
			chunkFilename: '[id].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: false,
						},
					},
					'sass-loader',
				],
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
		runtimeChunk: {
			name: 'runtime',
		},
	},
});
