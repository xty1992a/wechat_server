const express = require('express');
const path = require('path');
// const webpackMiddleware = require('./web_app/build/webpack.dev.conf');

var bodyParser = require('body-parser');
const app = express();//实例express框架

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true,
}));

// webpackMiddleware(app);
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const homeRoute = require('./routes/home');
const indexRoute = require('./routes/index');
const wechatRoute = require('./routes/wechat');
const fallbackRouter = require('./routes/fallback');
app.use('/', indexRoute);
app.use('/home', homeRoute);
app.use('/wechat', wechatRoute);
app.use('*', fallbackRouter);

//监听3000端口
app.listen(3000, function () {
  console.log('server listen http://45.77.19.249');
});
