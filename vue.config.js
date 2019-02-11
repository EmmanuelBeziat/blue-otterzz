const webpack = require('webpack')

module.exports = {
	configureWebpack: {
		devtool: 'source-map',
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					PACKAGE_JSON: '"' + escape(JSON.stringify(require('./package.json'))) + '"'
				}
			}),
			new webpack.IgnorePlugin(/^\.\/locale\/(en|fr)\.js$/, /moment$/)
		]
	},

	outputDir: '../dist',
	devServer: {
		port: 3040
	}
}
