const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';

const config = {
    mode: 'production',
    entry: './src/index.jsx',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    performance: {
        hints: 'warning'
    },
    output: {
        publicPath: ASSET_PATH,
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].chunk.js',
    },
    module: {
        rules:
            [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader'
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'
                },
                {
                    test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
                },
                {
                    test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=image/png'
                },
                {
                    test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=image/gif'
                }
            ]
    },
    optimization: {
        runtimeChunk: false,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    ecma: 6,
                    toplevel: true,
                    module: true,
                    beautify: false,
                    comments: false,
                    compress: {
                        warnings: false,
                        ecma: 6,
                        module: true,
                        toplevel: true
                    },
                    output: {
                        comments: false,
                        beautify: false,
                        indent_level: 2,
                        ecma: 6
                    },
                    mangle: {
                        keep_fnames: true,
                        module: true,
                        toplevel: true
                    }
                }
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: 'dependency',
            inject: 'body'
        }),
        new TerserPlugin(),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[name].[hash].css'
        }),
    ],
    externals: {
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000',
        })
    }
};

module.exports = config;
