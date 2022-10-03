const mongoose = require("mongoose");

const banner = new mongoose.Schema({
    banner_title: {
        type: String,
        required: true
    },
    banner_desc: {
        type: String,
        required: true
    },
    banner_img: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    link: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("banner", banner);