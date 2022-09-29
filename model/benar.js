const mongoose=require("mongoose");

const benar= new mongoose.Schema({
    benar_name:{
        type:String,
        require:true
    },
    benar_img:{
        type:String,
        require:true
    },
     status:{
        type:Boolean,
        default:true
     },
     link:{
        type:String,
        require:true
     }
},{
    timestamps:true
})


module.exports=mongoose.model("benar",benar);