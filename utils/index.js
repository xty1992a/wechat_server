const url = require('url');

function getClientIp(req) {
  return req.headers && req.headers['x-forwarded-for'] ||
	  req.connection.remoteAddress ||
	  req.socket.remoteAddress ||
	  req.connection.socket.remoteAddress;
}

module.exports = {
  getClientIp,
  fullUrl: function (req, opt = {host: 'wechat.frp.zzp.ink'}) {
	let result = url.format({
	  protocol: req.protocol,
	  host: opt.host || req.get('host'),
	  pathname: req.originalUrl,
	});
	console.log('client ip', req.get('x-forwarded-for'));
	return result
  },
  isWechat: function (req) {
	return /MicroMessenger/i.test(req.get('user-agent').toLowerCase());
  },
};
