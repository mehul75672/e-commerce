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

categorySchema.methods.toJSON = function () {
    const branch = this;
    const branchObj = branch.toObject();
    delete branchObj.__v;
    delete branchObj._id;
    return branchObj;
};
module.exports = mongoose.model("category", categorySchema);