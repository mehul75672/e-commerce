const { default: mongoose, models } = require("mongoose");

const orders = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId
    },
    products: [
        {
            brand: {
                type: String
            },
            product_id: {
                type: mongoose.Types.ObjectId,
                ref: "product"
            },
            product_name: {
                type: String,
            },
            product_img: {
                type: String
            },
            size: {
                type: Number
            },
            color: {
                type: String
            },
            price: {
                type: Number,
            },
            quantity: {
                type: Number
            }
        }
    ],
    total_price:
    {
        type: Number
    },
    discount: {
        type: Number
    },
    payment_method_id: {
        type: mongoose.Types.ObjectId
    },
    payment_status: {
        type: String,
        enum: ['pending', 'review', 'failed', 'cancelled', 'successful'],
        default: 'pending'
    },
    delivery_fee: {
        type: Number
    },
    delivery_date: {
        type: Date
    },
    Date:{
        type:String
    },
    status: {
        type: String,
        enum: ['pending', 'ready', 'failed', 'cancelled', 'delivered'],
        default: 'pending'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("orders", orders);