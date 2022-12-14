const mongoose = require("mongoose");
const findOrCreate = require ('mongoose-findorcreate');

const TwitterAuthorSchema = new mongoose.Schema({
    _id: Number,
    email: {
        type:String
    },
    name: String,
    last_name: String,
    age: Number,
    nickname: String,
    avatar: String,
    password: String,
    Timestamp: String,
    linked_account: String
});

TwitterAuthorSchema.plugin(findOrCreate);

const TwitterAuthorModel = mongoose.model('Twitter_Autores', TwitterAuthorSchema);

module.exports = { TwitterAuthorModel }