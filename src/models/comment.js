const {model} = require('mongoose');
const CommentSchema = require("../schemas/comment");

const Comment = model('comment',CommentSchema);

module.exports = Comment;