const mongoose = require('mongoose');
const like_comments = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    like: {
        type: Array
    },
    comments:{
        type: Array
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('like_comments',like_comments);
