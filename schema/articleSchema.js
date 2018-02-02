var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    content: String
});

module.exports = articleSchema;