const {Schema} = require('mongoose');

const blogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

module.exports = blogPostSchema;