const User = require("../src/models/user");
const assert = require("assert");
const mongoose = require("mongoose");
require('./create_test');

describe('Tests to check out the functionality of read operations of mongoose',()=>{
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

    it('Use findOne', async ()=>{
        let {name} = await User.findOne({name: "Joe"});
        assert(joe.name === name);
    })
    it('Use find', async function(){
        let users = await User.find({name:"Joe"});
        users.forEach((user) => assert(user.name === "Joe"));
    })
    it('Find by Id', async function(){
        let id = joe._id ;
        let user = await User.findById(id);
        assert(id.toString() === user._id.toString());
    });

})