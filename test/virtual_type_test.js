const assert=require('assert');
const User = require("../src/models/user");

describe('Virtual types tests', function(){
    it('Virtual type is getting correct data', async function(){

        let joe = await new User({name:"Joe", posts:[{title: "PostIt"}]}).save();
        let user = await User.findById(joe._id.toString());
        assert(user.postCount === 1);
    })
})