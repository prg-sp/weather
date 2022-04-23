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
										browsers: 'last 2 versions',
										autoprefixer: { grid: true },
									}),
								],
							},
						},
					},
				],
			},
		],
	},

	optimization: {
		minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
	},

	plugins: [new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' })],
});
