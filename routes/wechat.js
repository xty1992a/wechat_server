const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const request = require('request');
const config = require('../config');//引入配置文件
const wechat = require('../wechat/wechat');

const wechatApp = new wechat(config); //实例wechat 模块
//用于处理所有进入 /wechat  get 的连接请求
router.get('/', function (req, res) {
  console.log('will auth wechat');
  wechatApp.auth(req, res);
});

//用于处理所有进入 /wechat  post 的连接请求
router.post('/', function (req, res) {
  wechatApp.handleMsg(req, res);
});

//用于请求获取 access_token
router.get('/getAccessToken', function (req, res) {
  wechatApp.getAccessToken().then(function (data) {
	res.send(data);
  });
});

router.get('/getWebAccess', async function (req, res) {
  if (req.headers.code) {
	let token = await wechatApp.getWebToken(req.headers.code);
	res.json({...token, message: `获取${token.success ? '成功' : '失败'}`});
  }
  else {
	res.json({
	  success: false,
	  data: null,
	  message: '缺少必要参数code',
	})
  }
});

router.get('/getUserInfo', async function (req, res) {
  let {access_token, openid} = req.query;
  console.log(req.query);
  if (access_token && openid) {
	let info = await wechatApp.getUserInfo(access_token, openid);
	res.json({...info, message: `获取${info.success ? '成功' : '失败'}`});
  }
  else {
	res.json({
	  success: false,
	  data: null,
	  message: '缺少必要参数',
	});
  }
});

router.get('/getWxConfig', async (req, res) => {
  let config = await wechatApp.getWxConfig(decodeURIComponent(req.query.url));
  if (!config.success) {
	res.json({
	  success: false,
	  data: null,
	  message: '获取失败',
	});
  }
  else {
	res.json({
	  success: true,
	  data: config.data,
	  message: '获取成功',
	});
  }
});

router.get('/getMenus', (req, res) => {
  wechatApp.getWxMenu(req, res);
});

router.get('/updateWxMenu', async (req, res) => {
  console.log('updateWxMenu');
  try {
	let result = await wechatApp.updateWxMenu();
	console.log(result);
	res.json({
	  success: true,
	  message: '更新成功!',
	  data: null,
	})
  } catch (e) {
	console.log('updateWxMenu error ', e);
	res.json({
	  success: false,
	  message: '更新失败!',
	  data: e,
	})
  }
});

router.get('/readVoice', async (req, res) => {
  let voiceId = req.query.voiceId;
  wechatApp.getAccessToken()
	  .then(token => {
		let url = `http://api.weixin.qq.com/cgi-bin/media/voice/addvoicetorecofortext?access_token=${token}&format=mp3&voice_id=${voiceId}&lang=zh_CN`;
		request(url, (err, response, body) => {
		})
	  });
});

module.exports = router;
