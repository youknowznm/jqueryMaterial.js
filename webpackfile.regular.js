// 常规 - 不分离样式，不压缩，监听改动，用于开发调试
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const INPUT_PATH = path.join(__dirname, '/_javascripts')
const OUTPUT_PATH = path.join(__dirname, '/')

module.exports = {
    watch: true,
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
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                // IDEA: webpack 字体打包
                test: /\.(jpg|png|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },
}
