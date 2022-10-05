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
    commentid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'like_comments'
    }
},
{
    timestamps: true   
})

module.exports=mongoose.model("comments",commentSchema)