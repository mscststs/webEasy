const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin =  require("clean-webpack-plugin");

module.exports = {
    entry: [
        './src/index'
    ],
    target: 'node',
    mode:"development",
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CleanWebpackPlugin(["../release"],{
            allowExternal: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
    ],
    output: {
        path: path.join(__dirname, '../release'),
        filename: 'index.js'
    }
}