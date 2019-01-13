/*
config from development packages
* */
const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base.conf');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMiddleWare = require('webpack-dev-middleware');
const hotMiddleWare = require('webpack-hot-middleware');
const root = p => path.join(__dirname, '..', p);

const config = {
  entry: {
	app: ['webpack-hot-middleware/client', root('src/index.js')],
  },
  resolve: {
	extensions: ['.js', '.vue', '.json'],
	alias: {
	  vue: 'vue/dist/vue.js',
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
  ],
};

module.exports = function (app) {
  let webpackConfig = merge(base, {
	...config,
	output: {
	  path: root('../public'),
	  filename: 'js/[name].js',
	  publicPath: '/',
	},
  });

  const compiler = webpack(webpackConfig);
  app.use(devMiddleWare(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
	  colors: true,
	  chunks: false,
	},
  }));
  app.use(hotMiddleWare(compiler));
  return app;
};

