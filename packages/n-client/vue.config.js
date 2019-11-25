module.exports = {
    transpileDependencies: [],
    pluginOptions: {},
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('autoprefixer')(),
                ]
            }
        }
    },
    devServer: {
        proxy: {
            '/api/': {
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                },
                target: 'http://127.0.0.1:3000',
                ws: true
            }
        }
    }
};
