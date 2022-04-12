const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: { atas: './src/js/app.js' },

	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].[contenthash].bundle.js',
		clean: true,
		//img name
		assetModuleFilename: '[name][ext]',
	},

	module: {
		//img rule
		rules: [{ test: /.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' }],
	},

	//html template
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Oru appsas',
			template: './src/template.html',
			filename: 'index.html',
		}),
	],
};
