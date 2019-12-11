const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    item: String
});

const userSchema = new Schema({
    username: String,
    googleId: String,
    items: [ItemSchema]
});

const User = mongoose.model('user', userSchema);

module.exports = User;