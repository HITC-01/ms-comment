const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

module.exports = {
    context: __dirname + '/client',
    entry: './index.js',
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new CompressionPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'env'],
                },
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader',
              }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                }
              }
        ],
    },
    output: {
        path: __dirname + '/public',
        filename: 'sc-comment.js',
    }
};