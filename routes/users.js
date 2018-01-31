var express = require('express');
var router = express.Router();
var URL = require('url');

// // create database
var mongoose = require('mongoose'),
  DB_URL = 'mongodb://blogUser:blogUser@localhost:27017/blog';

// mongoose.connection.on('connected', function () {
//   console.log('Mongoose connection open to ' + DB_URL);
// });

/**
 * 连接
 */
mongoose.connect(DB_URL);
var demoSchema = require('../schema/articleSchema')

var db = mongoose.createConnection(DB_URL);
var article = db.model('article', demoSchema);

exports.list = function (req, res) {
  article.find(function (err, article) {
    res.json(article);
  });
};  




// router.get('/getUserInfo', function (req, res, next) {
//   var user = {};
//   var params = URL.parse(req.url, true).query;
//   if (params.id == '1') {

//     user.name = "ligh";
//     user.age = "1";
//     user.city = "北京市";

//   } else {
//     user.name = "SPTING";
//     user.age = "1";
//     user.city = "杭州市";
//   }

//   var response = { status: 1, data: user };
//   res.send(JSON.stringify(response));


// })

// module.exports = router;
