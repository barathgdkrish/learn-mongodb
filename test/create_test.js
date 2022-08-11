const assert = require('assert');
const User = require('../src/models/user')
const mongoose = require("mongoose");

describe('Tests for creating a new user', () => {
    before(async function (){
        await mongoose.connection.collections.users.drop();
        console.log("Dropping the users collection");
    });
    it('saves a user',async () => {
       const joe = new User({name: 'Joe'});
       await joe.save(); // save provides with a promise.
       assert(!joe.isNew);
       });
});