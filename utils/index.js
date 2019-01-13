const url = require('url');

module.exports = {
  fullUrl: function (req, opt = {}) {
	return url.format({
	  protocol: req.protocol,
	  host: req.get('host'),
	  pathname: req.originalUrl,
	}, opt);
  },
  isWechat: function (req) {
	return /MicroMessenger/i.test(req.get('user-agent').toLowerCase());
  },
};
