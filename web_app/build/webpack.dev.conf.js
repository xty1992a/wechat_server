/*
config from development packages
* */
const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base.conf');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const root = p => path.join(__dirname, '..', p);
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
	app: root('src/index.js'),
  },
  resolve: {
	extensions: ['.js', '.vue', '.json'],
	alias: {
	  vue: 'vue/dist/vue.js',
	},
  },
  devServer: {
	publicPath: '/',
	compress: true,
	disableHostCheck: true,
	hot: true,
	port: '8080',
	proxy: {
	  '/wechat/*': {
		target: 'http://localhost:3000/',
		changeOrigin: true,
		secure: false,
	  },
	},
  },
  mode: 'development',
  plugins: [
	new webpack.HotModuleReplacementPlugin(),
	new HtmlWebpackPlugin({
	  // filename: root('../views/index.html'),//'./views/index.html',
	  template: root('index.html'),//'./web_app/index.html',
	  inject: true,
	  hash: true,
	}),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new CopyWebpackPlugin([
	  {
		from: path.resolve(__dirname, '../static'),
		to: '',
		ignore: ['.*'],
	  },
	]),
  ],
};

module.exports = merge(base, {
  ...config,
  output: {
	path: root('../public'),
	filename: 'js/[name].js',
	publicPath: '/',
  },
});
