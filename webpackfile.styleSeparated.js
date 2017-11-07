// 压缩并分离样式 - 分离样式，压缩打包的js，命名为min.js，不监听改动
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const INPUT_PATH = path.join(__dirname, '/_javascripts')
const OUTPUT_PATH = path.join(__dirname, '/')

module.exports = {
    entry: path.resolve(__dirname, INPUT_PATH, 'entry.js'),
    output: {
        path: path.resolve(__dirname, OUTPUT_PATH),
        filename: 'jqueryMaterial.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: {
                    loader: 'css-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(jpg|png|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        new ExtractTextPlugin('jqueryMaterial.css'),
    ]
}
