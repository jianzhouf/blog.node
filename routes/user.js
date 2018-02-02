var mongoose = require('mongoose'),
    DB_URL = 'mongodb://blogUser:blogUser@localhost:27017/blog';

/**
* 连接
*/
mongoose.connect(DB_URL);
var userSchema = require('../schema/userSchema')
var db = mongoose.createConnection(DB_URL);
var User = db.model('user', userSchema);

