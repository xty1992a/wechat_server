// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  'plugins': {
	'autoprefixer': {
	  'browsers': [
		'> 1%',
		'last 2 versions',
		'Firefox > 20',
		'Android >= 3.2',
		'iOS 7',
	  ],
	},
	'postcss-px2rem': {remUnit: 37.5},
  },
}