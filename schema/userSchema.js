var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: { type: String, unique: true },
    realName: String,
    password: String
});

module.exports = userSchema;