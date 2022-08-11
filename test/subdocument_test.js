const assert = require('assert');
const User = require('../src/models/user')
describe('Tests for subdocuments', function(){

    it('Able to create a subdocument',async function () {
        let user = new User({name: "Joe", posts: [{title: "New Post"}]});
        await user.save();
        let {posts: [{title}]} = await User.findById(user._id.toString()).exec();
        assert(title === "New Post");
    })

    it('Able to add new subdocuments', async function () {
        let joe = await new User({name: "Joe", posts: []}).save();
        let user = await User.findById(joe._id.toString());
        assert(user.posts.length === 0);
        joe.posts.push({title: 'This too a new post'});
        await joe.save();
        user = await User.findById(joe._id.toString());
        assert(user.posts[0].title === 'This too a new post');
    })
    it('Able to remove specific documents', async function(){
        let joe = await new User({name: "Joe", posts: [{title: "Yet Another post"}]}).save();
        let user = await User.findById(joe._id.toString());
        assert(user.posts.length === 1);
        joe.posts[0].remove();
        await joe.save();
        user = await User.findById(joe._id.toString());
        assert(user.posts.length === 0);
    })

})