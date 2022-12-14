const PostSchema = require('../schemas/post');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true,'Name is required.'],
    },
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref:'blogPost',
    }],
    posts: [PostSchema],
    likes: Number,
});

UserSchema.virtual('postCount').get(function(){ return this.posts.length});

module.exports = UserSchema;