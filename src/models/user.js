const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');
const User = mongoose.model('user', UserSchema);
module.exports = User;
