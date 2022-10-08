const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    brands_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "brands"
    },
    name: {
        type: String,
        required: true
    },
    product_img: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: true
    },
    like: {
        type: Array
    },
    comments: [
        {
            text: {
                type: String,
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
            }, 
            createdAt:{
                type:Date,
                default:Date.now
            }          
        }
           
    ]
},
    {
        timestamps: true
    });

module.exports = mongoose.model("product", product_schema);