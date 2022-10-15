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
    tags: {
        type: Array
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
                ref: "User"
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }

    ]
},
    {
        timestamps: true
    });

product_schema.methods.toJSON = function () {
    const branch = this;
    const branchObj = branch.toObject();
    console.log(branchObj,"vDV");
    delete branchObj.__v;
    delete branchObj.results._id;
    return branchObj;
};
module.exports = mongoose.model("product", product_schema);