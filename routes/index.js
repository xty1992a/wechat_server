var express = require("express");
var router = express.Router();
var path = require("path");
const config = require("../config");
const utils = require("../utils/index");

/* GET home page. */
router.get("/", function (req, res, next) {
  let originalUrl = decodeURIComponent(utils.fullUrl(req));
  console.log(originalUrl);
  if (utils.isWechat(req)) {

    if (noCode(req)) {
      let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appID}&redirect_uri=${originalUrl}&response_type=code&scope=snsapi_base&state=redirected#wechat_redirect`;
      res.redirect(authUrl);
    } else {
      res.header("code", req.query.code);
      res.sendFile(path.resolve(__dirname, "../views/index.html"));
    }
  } else {
    res.sendFile(path.resolve(__dirname, "../views/index.html"));
  }

});

function noCode(req) {
  return !req.query.state || req.query.state !== "redirected";
}

module.exports = router;
