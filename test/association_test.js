const assert = require('assert');
const mongoose = require("mongoose");
const BlogPost = require('../src/models/blogPost');
const Comment = require('../src/models/comment');
const User = require('../src/models/user');

describe('Association tests', ()=>{

    before(async function (){
        try{
            const {users,blogposts,comments} = mongoose.connection.collections;
            let user_drop =  users.drop();
            let blogposts_drop =  blogposts.drop();
            let comments_drop =  comments.drop();
            await Promise.all([user_drop,blogposts_drop,comments_drop]);
            console.log("Dropping users, blogPosts, comments  collections");
        }catch(e){

        }
    });
    let joe, blogPost, comment;
    beforeEach(async ()=>{
        joe = new User({name: "Joe"});
        blogPost = new BlogPost({title: 'JS is great!', content:'Yes it is'});
        comment = new Comment({content: 'Congrats on a great post'});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        let joe_save = joe.save();
        let blog_save = blogPost.save();
        let comment_save = comment.save();

        await Promise.all([joe_save,blog_save,comment_save]);
    });

    it('finds a user and related blogPosts ', async function(){
        let user = await User.findById(joe._id.toString()).populate('blogPosts');
        assert(user.blogPosts[0].title === 'JS is great!')
    })
    it('Finds the complete related objects of a user', async function(){
        let user = await User.findById(joe._id.toString()).populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: Comment,


            }
        });
    })


})