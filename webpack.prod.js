const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');

const ASSET_PATH = process.env.ASSET_PATH || "/";

const config = {
  mode: "production",
  entry: "./src/index.jsx",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src/")
    }
  },
  performance: {
    hints: "warning"
  },
  output: {
    publicPath: ASSET_PATH,
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "url-loader?prefix=font/&limit=5000"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.jsx?$/
        },
        use: ["babel-loader", "@svgr/webpack", "url-loader"]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader"
      },
      {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/png"
      },
      {
        test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/gif"
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        // vendor chunk
        vendor: {
          // name of the chunk
          name: 'vendor',

          // async + async chunks
          chunks: 'all',

          // import file path containing node_modules
          test: /node_modules/,

          // priority
          priority: 20
        },

        // common chunk
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  // optimization: {
  //   runtimeChunk: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       cache: true,
  //       parallel: true,
  //       terserOptions: {
  //         ecma: 6,
  //         toplevel: true,
  //         module: true,
  //         beautify: false,
  //         comments: false,
  //         compress: {
  //           warnings: false,
  //           ecma: 6,
  //           module: true,
  //           toplevel: true
  //         },
  //         output: {
  //           comments: false,
  //           beautify: false,
  //           indent_level: 2,
  //           ecma: 6
  //         },
  //         mangle: {
  //           keep_fnames: true,
  //           module: true,
  //           toplevel: true
  //         }
  //       }
  //     })
  //   ]
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
    new AsyncChunkNames()
  ],
  externals: {
    config: JSON.stringify({
      apiUrl: "http://localhost:4000"
    })
  }
};

module.exports = config;
