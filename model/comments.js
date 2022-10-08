const { default: mongoose } = require("mongoose");

var commentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: "this field is required"
    },
    email:{
        type:String,
        required: "this field is required"
    },
    comment:{
        type:String,
        required:"this filed is required"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:"this filed is required"
    },
    like_comments_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'like_comments'
    }
},
{
    timestamps: true   
})

module.exports=mongoose.model("comments",commentSchema)