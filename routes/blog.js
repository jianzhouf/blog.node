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
var articleSchema = require('../schema/articleSchema')

var db = mongoose.createConnection(DB_URL);
var Article = db.model('article', articleSchema);

exports.list = function (req, res) {
  Article.find(function (err, article) {
    res.json({ code: 0, data: article, message: '哈哈' });
  });
};

exports.add = function (req, res) {
  var articleInsert = new Article(req.body)
  articleInsert.save(function (err) {
    if (err) {
      res.json(false)
    } else {
      res.json(true)
    }
  })
};


exports.detailById = function (req, res) {
  Article.find({ _id: req.query.id }, function (err, article) {
    res.json({ code: 0, data: article[0], message: '哈哈' });
  });
}

exports.update = function (req, res) {
  const id = req.body.id;
  const updateData = {
    title: req.body.title,
    content: req.body.content
  }
  Article.findByIdAndUpdate(id, updateData, function (err, article) {
    res.json({ code: 0, message: '更新成功' });
  })
}






