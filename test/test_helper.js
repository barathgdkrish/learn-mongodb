const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(async function (){
    try{
        await mongoose.connect('mongodb://localhost/users_test');
    }catch(e){
        console.warn('Warning', e);
        }
});
