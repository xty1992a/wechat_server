const express = require('express');
const router = express.Router();
const path = require('path');
const region = require('../data/region.json');
const utils = require('../utils/index');
const config = require('../config');


/* GET home page. */
router.get('/', function (req, res, next) {
  let originalUrl = decodeURIComponent(utils.fullUrl(req));
  console.log(originalUrl);
  if (utils.isWechat(req)) {
	if (noCode(req)) {
	  let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appID}&redirect_uri=${originalUrl}&response_type=code&scope=snsapi_userinfo&state=redirected#wechat_redirect`;
	  res.redirect(authUrl);
	}
	else {
	  res.cookie('code', req.query.code, {
		expires: 0,
	  });
	  res.sendFile(path.resolve(__dirname, '../views/home.html'));
	}
  } else {
	res.sendFile(path.resolve(__dirname, '../views/notWechat.html'));
  }

});

router.get('/region', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  //跨域允许的请求方式 
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  res.send(region);
});


function noCode(req) {
  return !req.query.state || req.query.state !== 'redirected'
}


module.exports = router;
