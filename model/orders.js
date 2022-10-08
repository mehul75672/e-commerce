const { default: mongoose, models } = require("mongoose");

const orders= mongoose.Schema({
    product_id:{
        type:mongoose.Types.ObjectId
    },
    Quantity:{
       type:Number
    },
    user_id:{
         type:mongoose.Types.ObjectId
    },
    status:{
        type:String,
        enum: ['scheduled','pending', 'preparing', 'ready', 'enroute', 'failed', 'cancelled', 'delivered'],
        default:'pending'
    }, 
    payment_statusL:{
        type:String,
        enum:['pending', 'review', 'failed', 'cancelled', 'successful'],
        default:'pending'
    },
    total_price:
    {
        type:Number
    },
    discount:{
        type:Number
    },
    delivery_fee:{
        type:Number
    },
    delivery_date:{
        type:Date
    },
    payment_metgod_id:{
        type:mongoose.Types.ObjectId
    },
},{
    timestamps: true
});

module.exports=mongoose.model("orders",orders);