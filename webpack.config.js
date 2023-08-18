const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.ts',

    },
    resolve: {
        alias:{
            'module-alias': './src/app.ts',
        },
        extensions: ['.ts','.js']
    },
    module:{
        rules:[
            { 
                test: /\.ts$/, 
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    devServer: {
        static: {
          directory: path.join(__dirname, './'),
        },
        compress: true,
        port: 3000,
    },
}