/*
webpack common config
* */

const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const root = p => path.join(__dirname, '..', p);

module.exports = {
  resolve: {
	extensions: ['.js', '.vue', '.json'],
	alias: {},
  },
  module: {
	rules: [
	  {
		test: /(\.jsx|\.js)$/,
		use: {
		  loader: 'babel-loader',
		},
		exclude: /node_modules/,
	  },
	  {
		test: /\.svg$/,
		loader: 'svg-sprite-loader',
		include: [root('src/icons')],
		options: {
		  symbolId: 'icon-[name]',
		},
	  },
	  {
		test: /\.css$/,
		use: [
		  {
			loader: 'style-loader',
		  },
		  {
			loader: 'css-loader',
		  },
		],
	  },
	  {
		test: /\.less$/,
		use: [
		  {
			loader: 'style-loader',
		  },
		  {
			loader: 'css-loader',
		  },
		  {
			loader: 'postcss-loader',
		  },
		  {
			loader: 'less-loader',
		  },
		],
	  },
	  {
		test: /\.vue$/,
		loader: 'vue-loader',
	  },
	],
  },
  plugins: [
	new VueLoaderPlugin(),
  ],
};
