const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = merge(common, {
	mode: 'development',

	// parodys erroro eilute consolej
	// restartina dev serveri stabdo
	devtool: 'source-map',

	//dev server
	devServer: {
		static: {
			directory: path.join(__dirname, 'src')
		},
		liveReload: true,
		compress: true,
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									postcssPresetEnv({
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

			// css/scss senas
			// {
			// 	test: /\.s[ac]ss$/i,
			// 	use: [
			// 		// Creates `style` nodes from JS strings
			// 		'style-loader',
			// 		// Translates CSS into CommonJS
			// 		'css-loader',
			// 'postcss-loader',
			// Compiles Sass to CSS
			// 'sass-loader'
			// ]
			// }
		]
	}
});
