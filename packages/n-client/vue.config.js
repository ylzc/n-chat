const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
    transpileDependencies: [],
    pluginOptions: {
        'electronBuilder': {
            nodeModulesPath: '../../node_modules',
            outputDir: '../../dist'
        },
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
    devServer: {
        proxy: {
            '/api/': {
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
                target: 'http://127.0.0.1:3000',
                ws: true
            }
        }
    },
    parallel: true,
    configureWebpack: {
        plugins: [
            new BundleAnalyzerPlugin()
        ],
        externals:{
            // 'vue': 'Vue',
            // 'vue-router': 'VueRouter',
        }
    }
};
