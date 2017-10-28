const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const ExtractTextPlugin = require('extract-text-webpack-plugin');
let a = new webpack.SourceMapDevToolPlugin()

const INPUT_PATH = path.join(__dirname, '/_javascripts')
const OUTPUT_PATH = path.join(__dirname, '/')

module.exports = {
    watch: true,
    entry: path.resolve(__dirname, INPUT_PATH, 'entry.js'),
    output: {
        path: path.resolve(__dirname, OUTPUT_PATH),
        filename: 'jqueryMaterial.js',
    },
    // devtool: a,
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
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'sass-loader']
            //     })
            // },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
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
        // new ExtractTextPlugin('jqueryMaterial.css'),
    ]
}
