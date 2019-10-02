const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const glob = require('glob-all');

const webpackBaseConfig = require('./webpack.common.config');

module.exports = merge(webpackBaseConfig, {
   optimization: {
      minimizer: [
         new UglifyJsPlugin({}),
         new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
               discardComments: true,
               core: false,
               minifyParams: false,
               miniSelectors: false,
            },
            canPrint: true,
         }),
      ],
   },
});