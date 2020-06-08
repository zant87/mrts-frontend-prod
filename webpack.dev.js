const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ASSET_PATH = process.env.ASSET_PATH || "/";
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const config = {
  mode: "development",
  entry: "./src/index.jsx",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  output: {
    publicPath: ASSET_PATH,
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
        test: /\.(s*)css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.(s*)css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.jsx?$/,
        },
        use: ["babel-loader", "@svgr/webpack", "url-loader"],
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
      },
      {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/png",
      },
      {
        test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/gif",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 3000,
    hot: true,
    proxy: {
      "/api": "http://10.10.10.187:8080",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  externals: {
    // глобальный конфиг
    config: JSON.stringify({
      apiUrl: "http://localhost:4000",
      isLocalDeployment: true,
      arcGisMapServerUrl: "http://srvdev.geogracom.com:6080/arcgis/rest/services/TS_projects/MapServer/"
    }),
  },
};

module.exports = config;
