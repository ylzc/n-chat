module.exports = {
	'transpileDependencies': [
		'vuetify',
	],
	pluginOptions: {
		// 'electronBuilder': {
		// 	nodeModulesPath: '../../node_modules',
		// 	outputDir:'../../dist'
		// },
	},
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					require('autoprefixer')(),
				]
			}
		}
	},
};
