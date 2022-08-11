const {model} = require('mongoose');
const BlogPostSchema = require('../schemas/blogPost');
const BlogPost = model('blogPost',BlogPostSchema);

module.exports = BlogPost;