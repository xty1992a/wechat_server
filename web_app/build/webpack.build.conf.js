/*
	config for build umd module to use
* */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const base = require('./webpack.base.conf');
const merge = require('webpack-merge');
const root = p => path.join(__dirname, '..', p);
let mode = 'production';
if (process.argv.includes('--watch')) {
  mode = 'development'
}

module.exports = merge(base, {
  mode,
  entry: root('src/index.js'),
  output: {
	path: root('../public'),
	filename: 'js/[name].js',
	publicPath: '/',
  },
  watchOptions: {
	ignored: /node_modules/,
  },
  externals: {
	/*	vue: {
		  root: 'Vue',
		  commonjs: 'vue',
		  commonjs2: 'vue',
		  amd: 'vue',
		},*/
  },
  plugins: [
	new HtmlWebpackPlugin({
	  filename: '../views/index.html',
	  template: root('index.html'),
	  inject: true,
	  hash: true,
	}),
  ],
  performance: false,
  optimization: {
	minimize: true,
  },
});
