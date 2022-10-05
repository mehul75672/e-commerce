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
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {
    timestamps: true
});
module.exports = mongoose.model('like_comments', like_comments);
