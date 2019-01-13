var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function (req, res, next) {
  /*  try {
   res.sendFile(path.resolve(__dirname, `../public/${req.baseUrl}/index.html`));
   } catch (e) {
   console.log('fallback error', e);
   }*/
  res.sendFile(path.resolve(__dirname, '../views/404.html'));

});

module.exports = router;
