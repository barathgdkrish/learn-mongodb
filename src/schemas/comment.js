const {Schema} = require('mongoose');

const CommentSchema = new Schema({
    content: String,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = CommentSchema;