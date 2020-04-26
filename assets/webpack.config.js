const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require('webpack-notifier')
const CompressionPlugin = require('compression-webpack-plugin');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');



// //
const ThreadLoader = require('thread-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = (env) => {

  ThreadLoader.warmup({
    workerParallelJobs: 4
  }, ['style-loader', 'css-loader', 'sass-loader', 'babel-loader']);

  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';
  // configuations
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000;
  const sourcePath = path.join(__dirname, './src');
  const buildDirectory = path.join(__dirname, './dist');
  const entryJS = './script/index.js';
  const entryCSS = './style/index.scss';
  const PUBLIC_PATH = 'http://mywebasite.loc/assets/build/';


  let cssLoader = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      'cache-loader',
      {
        loader: 'thread-loader',
        options: {
          workerParallelJobs: 2
        }
      },
      { loader: 'css-loader', options: { sourceMap: true } },
      {
        loader: 'sass-loader', options: {
          sourceMap: true,
          // data: '@import "./src/style/config";'
        }
      },
    ]
  });

  let plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new webpack.ProvidePlugin({
      // add global provide
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true
    }),
    new ExtractTextPlugin("[name].css")
  ];


  const stats = {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: {
      green: '\u001b[32m'
    }
  };


  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd
      ? 'cheap-source-map'
      : 'source-map',
    context: sourcePath,
    entry: {
      bundleJS: entryJS,
      bundleCSS: entryCSS
    },
    output: {
      path: buildDirectory,
      // publicPath: PUBLIC_PATH,
      filename: '[name].js',
      // chunkFilename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: sourcePath,
          use: cssLoader
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
        {
          test: /\.(js)$/,
          include: sourcePath,
          use: [
            {
              loader: 'thread-loader',
              options: {
                workerParallelJobs: 2
              }
            },
            'babel-loader'
          ]
        }
      ]
    },
    plugins,
    stats,
    optimization: {
      minimizer: [
        new UglifyJsPlugin({ /* your config */ })
      ]
    }

  }


};
