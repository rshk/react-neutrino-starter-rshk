module.exports = {
    use: [
        '@neutrinojs/standardjs',
        ['@neutrinojs/react', {
            devServer: {
                host: '127.0.0.1',
                port: 3000,
                https: false,
            },
            html: {
                title: 'react-neutrino-starter-rshk'
            }
        }],
        '@neutrinojs/jest',
        ['@neutrinojs/eslint', {
            eslint: {
                plugins: ['import', 'flowtype', 'jsx-a11y', 'react'],
                rules: {},
                baseConfig: {extends: ['eslint-config-react-app']},
            },
        }],
        ['@neutrinojs/style-loader', {
            test: /\.global\.(css|sass|scss)$/,
            modulesTest: /(?<!\.global)\.(css|sass|scss)$/,
            modules: true,
            css: {
                localIdentName: '[local]--[hash:base64:8]',
            },
            loaders: [
                {
                    loader: 'sass-loader',
                    useId: 'sass',
                    options: {
                        includePaths: ['node_modules', 'src'],
                        localIdentName: '[local]--[hash:base64:8]',
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                        ]
                    }
                }
            ]
        }],

        // Resolve modules from ./src folder, to allow
        // absolute imports
        (neutrino) => {
            neutrino.config.resolve
                    .modules
                    .add(neutrino.options.source);
        },

        // Copy static files over
        ['@neutrinojs/copy', {
            patterns: [
                {from: './src/static', to: './'},
            ],
            options: {},
            pluginId: 'copy'}],

        // Load env vars and pass them to client-side js
        ['@neutrinojs/env', ['API_URL']],
    ]
};
