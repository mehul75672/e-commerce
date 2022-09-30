const wrapper = require("../model/wrapper")


const wrapper_add=async(req,res)=>{
    try {
        let add= new wrapper({
            wrapper_img:req.file.filename,
            title:req.body.title,
            decs:req.body.decs
        })
        add.save();
        return res.status(201).json({status:true,result:add});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

const wrapper_all=async(req,res)=>{
    var all= await wrapper.find();
    return res.status(200).json({status:true,result:all});
}

module.exports={wrapper_add,wrapper_all}