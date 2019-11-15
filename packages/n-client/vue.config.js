module.exports = {
	'transpileDependencies': [],
	pluginOptions: {
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
