const banner  = require ("../model/banner");
const fs =require("fs"); 

 const banner_add=async(req,res)=>{
    try {
         const add= new banner ({
            banner_title:req.body.banner_title,
            banner_desc:req.body.banner_desc,
            banner_img:req.file.filename,
            link:req.body.link   
         })    
         await add.save();  
         return res.status(201).json({status:true,result:add});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
 }

 const banner_delete=async(req,res)=>{
   try {
      const id=req.params.id
      const get= banner.findById(id);
      if (get) {
         fs.unlinkSync('./public/images/' + get.banner_img);
         get.delete(); 
         return res.status(200).json("banner delete successfully");
      } else {
         return res.status(401).json("banner not exist");
      }
       
   } catch (error) {
      return res.status(500).json({error:error.message});
   }
 }

 const banner_all=async(req,res)=>{
    try {
      const all= await banner.find();
      return res.status(200).json({status:true,result:all})
    } catch (error) {
      return res.status(500).json({error:error.message});
    }
 }

 module.exports={banner_add,banner_all,banner_delete,};