const mongoose = require("mongoose");
const User = require("../src/User");
const assert = require("assert");
require('./update_test');
describe('Tests for the remove/delete operations', function (){
    let joe;
    let count=0;
    /*The below hook runs before any of the below tests are run
        */
    before(async function (){
        await mongoose.connection.collections.users.drop();
        console.log("Dropping the users collection");
    });

    /*The below hook runs before each time one of the below tests are run
    */
    beforeEach('create a new user',async ()=>{
        joe = new User({name: 'Joe', count: ++count});
        await joe.save();
    });

    it('Remove by remove()', async function(){
        let id = joe._id.toString();
        const {_id } = await joe.remove();
        assert(_id.toString() === id);
    })
    it('Find by id and remove',async function(){
        let _id = joe._id.toString();
        let {name} = await User.findByIdAndRemove(_id,{new: true}).exec();
        assert(name === 'Joe');
    })
    it('Find by id and delete',async function(){
        let _id = joe._id.toString();
        let {name} = await User.findByIdAndDelete(_id,{new: true}).exec();
        assert(name === 'Joe');
    })
    it('Find one and remove',async function(){
        let {name} = await User.findOneAndRemove({name:'Joe'});
        assert(name === 'Joe');
    })
    it('delete one',async function(){
        let {deletedCount} = await User.deleteOne({name:'Joe'}).exec();
        assert(deletedCount === 1);
    })
    it('delete many',async function(){
        let {deletedCount} = await User.deleteMany({}).exec();
        assert(deletedCount > 0);
    })
})