const mongoose = require("mongoose");
const User = require("../src/models/user");
const assert = require("assert");
require('./read_test');
describe('Tests for updating mongo documents', function(){
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
        joe = new User({name: 'Joe', likes: count});
        await joe.save();
    });

    it('Update using the model instance', async function(){
        joe.name = "Joey";
        await joe.save();
        assert(joe.name === "Joey");
    })
    it('Update by set n save',async function(){
        joe.set('name','alex');
        let {name} = await User.findById(joe._id.toString());
        assert(name !== joe.name);
        await joe.save();
        let {
            name: newName
        } = await User.findById(joe._id.toString());
        assert(newName === 'alex');
    })
    it('Update by model instance update', async function (){
        await joe.updateOne({name: 'Alex'}).exec();
        let {name} = await User.findById(joe._id.toString());
        assert(name === 'Alex');
    })
    it('Update by Model.findByIdAndUpdate()', async function(){
        let {name} = await User.findByIdAndUpdate(joe._id,{name: 'Alex'},{new: true});
        assert(name === 'Alex');
    })
    it('Update by findOneAndUpdate', async function(){
        let {name} = await User.findOneAndUpdate({name: "Joe"},{name: "Alex"},{new: true}).exec();
        assert(name === 'Alex');
    })
    it('Update by updateMany', async function(){
        let result = await User.updateMany({name:"Joe"},{name:"Joey"},{new: true}).exec();
        let users = await User.find({name: "Joe"});
        assert(users.length === 0);
    })
    it('Update using $inc operator',async function(){
        let {likes} = await User.findOneAndUpdate({name:'Joe'},{$inc : {likes: 1}},{new: true}).exec();
        assert(likes=== 1);
    })

})