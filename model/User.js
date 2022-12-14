const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    fullname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers:{
        type: Array
    },
    following:{
        type: Array
    },
    status:{
        type:Boolean,
        default:false
    },
    token:{
        type: String
    },
    tokenExpires:{
        type:String
    }
}, {
    timestamps: true
});

const User = mongoose.model("users", userSchema);

module.exports = User;