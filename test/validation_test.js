const assert = require("assert");
const User = require("../src/models/user");


describe('Validating records', () => {
    it('Requires a user name',() => {
        const user = new User({name: undefined});
        const {errors:{name: {message}}} = user.validateSync();
        assert(message === 'Name is required.');
    })
    it('Requires a user\'s name longer than 2 characters', function (){
        const user = new User({name: "Jo"});
        const {errors:{name:{message}}} = user.validateSync();
        assert(message === 'Name must be longer than 2 characters.');
    })
    it('Disallows invalid records from being saved', async function(){
        const user = new User({name: 'Al'});
        try{
            await user.save();
        }catch({errors:{name:{message}}}){
            assert(message === 'Name must be longer than 2 characters.');
        }
    })
})