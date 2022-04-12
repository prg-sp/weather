const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',

	module: {
		rules: [
			//babel compile
			// {
			// 	test: /.jsx?$/,
			// 	exclude: /node_modules/,
			// 	use: {
			// 		loader: 'babel-loader',
			// 		options: { presets: ['@babel/preset-env'] }
			// }
			// },
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									postcssPresetEnv({
										//priklausomai kokie nustatymai cia nurodyta, tada ir bus prefixai
										browsers: 'last 2 versions',
										autoprefixer: { grid: true }
									})
								]
							}
						}
					}
					// { loader: 'sass-loader' }
				]
			}
		]
	},

	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin()
			// new HtmlWebpackPlugin({
			// 	template: './src/template.html',
			// 	minify: {
			// 		removeAttributeQuotes: true,
			// 		collapseWhitespace: true,
			// 		removeComments: true
			// 	}
			// })
		]
	},

	plugins: [
		new MiniCssExtractPlugin({ filename: 'kra.[name].[contenthash].css' })
	]
});
