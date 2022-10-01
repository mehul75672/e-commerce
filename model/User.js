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
    status:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
});

const User = mongoose.model("users", userSchema);

module.exports = User;