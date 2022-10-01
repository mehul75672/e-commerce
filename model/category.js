const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    category_img: {
        type: String,
    },
    status:{
        type:Boolean,
        default:true
    }
}, { timestamps: true });

module.exports = mongoose.model("categry", categorySchema);