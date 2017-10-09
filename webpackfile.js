const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const INPUT_PATH = path.join(__dirname, '/_javascripts')
const OUTPUT_PATH = path.join(__dirname, '/')

// const extractSass = new ExtractTextPlugin({
//     filename: '[name].[contenthash].css',
//     disable: process.env.NODE_ENV === 'development'
// });

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
                use: [
                    {
                        loader: 'style-loader' // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: 'css-loader' // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: 'sass-loader' // 将 Sass 编译成 CSS
                    },
                ],
            },
            {
                // IDEA: webpack 字体打包
                test: /\.(jpg|png|ttf)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: true,
        //     },
        // }),
    ]
}
