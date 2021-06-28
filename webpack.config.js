const path = require('path');
const HtmlWebackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')

    },
    resolve: {
        extensions:['.js'],
        alias:{
            "@":path.resolve(__dirname,'src'),
            "@core":path.resolve(__dirname,'src/core'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebackPlugin({
            title: "Excel",
            template: 'index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist'),
            }]

        }),
        new MiniCssExtractPlugin(
            {filename: 'bundle.[hash].css'}
        )
    ]


};

