const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

module.exports = {
    context: __dirname + '/client',
    entry: './index.js',
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
                plugins: [
                    new webpack.DefinePlugin({ //<--key to reduce React's size
                      'process.env': {
                        'NODE_ENV': JSON.stringify('production')
                      }
                    }),
                    new CompressionPlugin()
                ],
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
              }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              }
        ],
    },
    output: {
        path: __dirname + '/public',
        filename: 'sc-comment.js',
    }
};