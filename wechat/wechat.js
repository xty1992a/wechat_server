"use strict";//设置为严格模式

const crypto = require("crypto"); //引入加密模块
const https = require("https"); //引入 htts 模块
const util = require("util"); //引入 util 工具包
const fs = require("fs"); //引入 fs 模块
const urltil = require("url");//引入 url 模块
const accessTokenJson = require("./access_token"); //引入本地存储的 access_token
const jsApiTicketJson = require("./jsapi_ticket"); //引入本地存储的 access_token
const menus = require("./menus"); //引入微信菜单配置
const parseString = require("xml2js").parseString;//引入xml2js包
const msg = require("./msg");//引入消息处理模块
const request = require("request");
const config = require("../config");
const qs = require("qs");
const CryptoGraphy = require("./cryptoGraphy"); //微信消息加解密模块

/**
 * 构建 WeChat 对象 即 js中 函数就是对象
 * @param {JSON} config 微信配置文件
 */
let WeChat = function (config) {
  //设置 WeChat 对象属性 config
  this.config = config;
  //设置 WeChat 对象属性 token
  this.token = config.token;
  //设置 WeChat 对象属性 appID
  this.appID = config.appID;
  //设置 WeChat 对象属性 appScrect
  this.appScrect = config.appScrect;
  //设置 WeChat 对象属性 apiDomain
  this.apiDomain = config.apiDomain;
  //设置 WeChat 对象属性 apiURL
  this.apiURL = config.apiURL;

  /**
   * 用于处理 https Get请求方法
   * @param {String} url 请求地址
   */
  this.requestGet = function (url) {
    return new Promise(function (resolve, reject) {
      https.get(url, function (res) {
        let buffer = [], result = "";
        //监听 data 事件
        res.on("data", function (data) {
          buffer.push(data);
        });
        //监听 数据传输完成事件
        res.on("end", function () {
          result = Buffer.concat(buffer).toString("utf-8");
          //将最后结果返回
          resolve(result);
        });
      }).on("error", function (err) {
        reject(err);
      });
    });
  };

  /**
   * 用于处理 https Post请求方法
   * @param {String} url  请求地址
   * @param {JSON} data 提交的数据
   */
  this.requestPost = function (url, data) {
    return new Promise(function (resolve, reject) {
      //解析 url 地址
      let urlData = urltil.parse(url);
      //设置 https.request  options 传入的参数对象
      let options = {
        //目标主机地址
        hostname: urlData.hostname,
        //目标地址
        path: urlData.path,
        //请求方法
        method: "POST",
        //头部协议
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(data, "utf-8"),
        },
      };
      let req = https.request(options, function (res) {
        let buffer = [], result = "";
        //用于监听 data 事件 接收数据
        res.on("data", function (data) {
          buffer.push(data);
        });
        //用于监听 end 事件 完成数据的接收
        res.on("end", function () {
          result = Buffer.concat(buffer).toString("utf-8");
          resolve(result);
        });
      })
      //监听错误事件
        .on("error", function (err) {
          console.log(err);
          reject(err);
        });
      //传入数据
      req.write(data);
      req.end();
    });
  };
};

/**
 * 微信接入验证
 * @param {Request} req Request 对象
 * @param {Response} res Response 对象
 */
WeChat.prototype.auth = function (req, res) {
  console.log("auth");
  this.getAccessToken()
    .then((data) => {
      //格式化请求连接
      let url = util.format(this.apiURL.createMenu, this.apiDomain, data);
      //使用 Post 请求创建微信菜单
      this.requestPost(url, JSON.stringify(menus))
        .then(data => {
          //将结果打印
          console.log(data, JSON.stringify(menus));
        })
        .catch(err => {
          console.log("[error] weChat request " + url, err);
        });
    });

  //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
  let signature = req.query.signature,//微信加密签名
    timestamp = req.query.timestamp,//时间戳
    nonce = req.query.nonce,//随机数
    echostr = req.query.echostr;//随机字符串

  //2.将token、timestamp、nonce三个参数进行字典序排序
  let array = [this.token, timestamp, nonce].sort();

  //3.将三个参数字符串拼接成一个字符串进行sha1加密
  let tempStr = array.join("");
  const hashCode = crypto.createHash("sha1"); //创建加密类型
  let resultCode = hashCode.update(tempStr, "utf8").digest("hex"); //对传入的字符串进行加密

  //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (resultCode === signature) {
    res.send(echostr);
  } else {
    res.send("mismatch");
  }
};

/**
 * 获取微信 access_token
 */
WeChat.prototype.getAccessToken = function () {
  return new Promise((resolve, reject) => {
    //获取当前时间
    let currentTime = new Date().getTime();
    //格式化请求地址
    let url = util.format(this.apiURL.accessTokenApi, this.apiDomain, this.appID, this.appScrect);
    //判断 本地存储的 access_token 是否有效
    if (accessTokenJson.access_token === "" || accessTokenJson.expires_time < currentTime) {
      this.requestGet(url)
        .then(function (data) {
          let result = JSON.parse(data);
          if (data.indexOf("errcode") < 0) {
            accessTokenJson.access_token = result.access_token;
            accessTokenJson.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
            //更新本地存储的
            fs.writeFile("./wechat/access_token.json", JSON.stringify(accessTokenJson), (err, res) => {
              if (err) {
                console.log("[error] write access_token ", err);
              }
              console.log(res);
            });
            //将获取后的 access_token 返回
            resolve(accessTokenJson.access_token);
          } else {
            //将错误返回
            resolve(result);
          }
        });
    } else {
      //将本地存储的 access_token 返回
      resolve(accessTokenJson.access_token);
    }
  });
};

WeChat.prototype.getJSApiTicket = function () {
  let that = this;
  return new Promise(async resolve => {
    let currentTime = new Date().getTime();
    let token = await that.getAccessToken();
    let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`;
    if (jsApiTicketJson.jsapi_ticket === "" || jsApiTicketJson.expires_time < currentTime) {
      this.requestGet(url).then(function (data) {
        let result = JSON.parse(data);
        console.log("getJSApiTicket from wechat ", result);
        if (result.errmsg === "ok") {
          jsApiTicketJson.jsapi_ticket = result.ticket;
          jsApiTicketJson.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
          //更新本地存储的
          fs.writeFile("./wechat/jsapi_ticket.json", JSON.stringify(jsApiTicketJson), (err, res) => {
            if (err) {
              console.log("[error] write jsapi_ticket ", err);
            }
            console.log(res);
          });
          //将获取后的 jsapi_ticket 返回
          resolve({success: true, data: jsApiTicketJson.jsapi_ticket});
        } else {
          //将错误返回
          resolve({success: false, data: result});
        }
      });
    } else {
      resolve({success: true, data: jsApiTicketJson.jsapi_ticket});
    }
  });
};

/**
 * 微信消息处理
 * @param {Request} req Request 对象
 * @param {Response} res Response 对象
 */
WeChat.prototype.handleMsg = function (req, res) {
  let buffer = [], that = this;

  //实例微信消息加解密
  let cryptoGraphy = new CryptoGraphy(that.config, req);

  //监听 data 事件 用于接收数据
  req.on("data", function (data) {
    buffer.push(data);
  });
  //监听 end 事件 用于处理接收完成的数据
  req.on("end", function () {
    let msgXml = Buffer.concat(buffer).toString("utf-8");
    // console.log(msgXml);
    //解析xml
    parseString(msgXml, {explicitArray: false}, function (err, result) {
      if (!err) {
        result = result.xml;
        //判断消息加解密方式
        if (req.query.encrypt_type === "aes") {
          //对加密数据解密
          result = cryptoGraphy.decryptMsg(result.Encrypt);
        }
        let toUser = result.ToUserName; //接收方微信
        let fromUser = result.FromUserName;//发送仿微信
        let reportMsg = ""; //声明回复消息的变量

        //判断消息类型
        if (result.MsgType.toLowerCase() === "event") {
          //判断事件类型
          switch (result.Event.toLowerCase()) {
            case "subscribe":
              //回复消息
              let content = "欢迎关注 hvkcoder 公众号，一起斗图吧。回复以下数字：\n";
              content += "1.你是谁\n";
              content += "2.关于Node.js\n";
              content += "回复 “文章”  可以得到图文推送哦~\n";
              reportMsg = msg.txtMsg(fromUser, toUser, content);
              break;
            case "click":
              let contentArr = [
                {
                  Title: "Node.js 微信自定义菜单", Description: "使用Node.js实现自定义微信菜单",
                  PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                  Url: "http://blog.csdn.net/hvkcoder/article/details/72868520",
                },
                {
                  Title: "Node.js access_token的获取、存储及更新", Description: "Node.js access_token的获取、存储及更新",
                  PicUrl: "http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                  Url: "http://blog.csdn.net/hvkcoder/article/details/72783631",
                },
                {
                  Title: "Node.js 接入微信公众平台开发", Description: "Node.js 接入微信公众平台开发",
                  PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                  Url: "http://blog.csdn.net/hvkcoder/article/details/72765279",
                },
              ];
              //回复图文消息
              reportMsg = msg.graphicMsg(fromUser, toUser, contentArr);
              break;
          }
        } else {
          //判断消息类型为 文本消息
          if (result.MsgType.toLowerCase() === "text") {
            //根据消息内容返回消息信息
            switch (result.Content) {
              case "1":
                reportMsg = msg.txtMsg(fromUser, toUser, "Hello ！我的英文名字叫 redbuck");
                break;
              case "2":
                reportMsg = msg.txtMsg(fromUser, toUser, "Node.js是一个开放源代码、跨平台的JavaScript语言运行环境，采用Google开发的V8运行代码,使用事件驱动、非阻塞和异步输入输出模型等技术来提高性能，可优化应用程序的传输量和规模。这些技术通常用于数据密集的事实应用程序");
                break;
              case "商城首页":
                console.log("shop main hostname", req.hostname);
                reportMsg = msg.graphicMsg(fromUser, toUser, [
                  {
                    Title: "vue项目 首页", Description: `项目首页 https://wechat.frp.zzp.ink/`,
                    PicUrl: "",
                    Url: "https://wechat.frp.zzp.ink/",
                  },
                ]);
                break;
              case "文章":
                let contentArr = [
                  {
                    Title: "Node.js 微信自定义菜单", Description: "使用Node.js实现自定义微信菜单",
                    PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                    Url: "http://blog.csdn.net/hvkcoder/article/details/72868520",
                  },
                  {
                    Title: "Node.js access_token的获取、存储及更新", Description: "Node.js access_token的获取、存储及更新",
                    PicUrl: "http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                    Url: "http://blog.csdn.net/hvkcoder/article/details/72783631",
                  },
                  {
                    Title: "Node.js 接入微信公众平台开发", Description: "Node.js 接入微信公众平台开发",
                    PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                    Url: "http://blog.csdn.net/hvkcoder/article/details/72765279",
                  },
                ];
                //回复图文消息
                reportMsg = msg.graphicMsg(fromUser, toUser, contentArr);
                break;
              default:
                reportMsg = msg.txtMsg(fromUser, toUser, "没有这个选项哦");
                break;
            }
          }
        }
        //判断消息加解密方式，如果未加密则使用明文，对明文消息进行加密
        reportMsg = req.query.encrypt_type == "aes" ? cryptoGraphy.encryptMsg(reportMsg) : reportMsg;
        //返回给微信服务器
        res.send(reportMsg);

      } else {
        //打印错误
        console.log(err);
      }
    });
  });
};

WeChat.prototype.getWebToken = async (code) => await getToken(code);

WeChat.prototype.getUserInfo = async (accessToken, openId) => await getUserInfo(accessToken, openId);

WeChat.prototype.getWxConfig = async function (url) {
  let timestamp = createTimeStamp();
  let nonceStr = createNonceStr();
  let ticket = await this.getJSApiTicket();
  if (!ticket.success) return Promise.resolve({success: false, data: ticket.data});
  let signature = createSignature(ticket.data, nonceStr, timestamp, url);
  const option = {
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: config.appID, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature,// 必填，签名
    jsApiList: [], // 必填，需要使用的JS接口列表
  };
  return Promise.resolve({success: true, data: option});
};

function getToken(code) {
  //getWebToken.js
  let reqUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?";
  let params = {
    appid: config.appID,
    secret: config.appScrect,
    code: code,
    grant_type: "authorization_code",
  };
  let options = {
    method: "get",
    url: reqUrl + qs.stringify(params),
  };
  return new Promise((resolve) => {
    request(options, function (err, res, body) {
      if (res) {
        let data = JSON.parse(body);
        if (data.errmsg) {
          resolve({success: false, data});
        } else {
          resolve({success: true, data});
        }
      } else {
        resolve({success: false, data: err});
      }
    });
  });
}

function getUserInfo(AccessToken, openId) {
  let reqUrl = "https://api.weixin.qq.com/sns/userinfo?";
  let params = {
    access_token: AccessToken,
    openid: openId,
    lang: "zh_CN",
  };

  let options = {
    method: "get",
    url: reqUrl + qs.stringify(params),
  };

  return new Promise((resolve) => {
    request(options, function (err, res, body) {
      if (res) {
        let data = JSON.parse(body);
        if (data.errmsg) {
          resolve({success: false, data});
        } else {
          resolve({success: true, data});
        }
      } else {
        resolve({success: false, data: err});
      }
    });
  });
}

// region 获取签名
function createSignature(ticket, noncestr, timestamp, url) {
  let str = "jsapi_ticket=" + ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url;
  const hashCode = crypto.createHash("sha1"); //创建加密类型
  return hashCode.update(str, "utf8").digest("hex"); //对传入的字符串进行加密
}

function createNonceStr() {
  return Math.random().toString(36).substr(2, 15);
}

function createTimeStamp() {
  return parseInt(new Date().getTime() / 1000) + "";
}

// endregion

module.exports = WeChat;
