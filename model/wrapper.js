const { default: mongoose, model } = require("mongoose");


const wrapper_schema = new mongoose.Schema({
    wrapper_img: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    decs: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("wrapper", wrapper_schema);