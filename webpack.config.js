module.exports = {
    mode: "development",
    entry: "./main.ts",
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    devServer: {
        static: {
            directory: __dirname,
        },
        compress: true,
        port: 8080,
    },
};