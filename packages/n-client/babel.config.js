module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    'plugins': [
        [
            'import',
            {
                'libraryName': 'ant-design-vue',
                'libraryDirectory': 'es',
                'style': 'css'
            }
        ],// `style: true` for less,
        '@babel/plugin-proposal-optional-chaining'
    ]
};
