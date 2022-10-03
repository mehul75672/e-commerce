"use strict";
const banner = require("../model/banner");
const fs = require("fs");
const path=require("path")
const banner_add = async (req, res) => {
   try {
      const add = new banner({
         banner_title: req.body.banner_title,
         banner_desc: req.body.banner_desc,
         banner_img: req.file.filename,
         link: req.body.link
      })
      await add.save();
      return res.status(201).json({ status: true, result: add });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
}
  

const banner_update = async (req, res) => {
   try {    
      const id = req.params.id
      const get = await banner.findById(id);
      console.log(req.body.banner_desc);
      let images
      if (req.file) {
         images = req.file.filename
         const filePath = path.join(__dirname, process.env.images + get.banner_img);
         fs.unlinkSync(filePath);
      } else {
         images = get.banner_img
      }
      const result = await banner.findByIdAndUpdate(id,
         {
            $set: {
               banner_title: req.body.banner_title,
               banner_desc: req.body.banner_desc,
               banner_img: images,
               link: req.body.link
            }
         },{new:true})
      return res.status(200).json({ message: result });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
   }
}

const banner_delete = async (req, res) => {
   const id = req.params.id
   try {
       const get = await banner.findById(id);
       if (get) {
           const filePath = path.join(__dirname, process.env.images+get.banner_img);
           console.log(filePath);
           fs.unlinkSync(filePath);
           get.delete();
           return res.status(200).json("banner delete successfully");
       } else {
           return res.status(400).json("banner not exist");
       }
   }
   catch (error) {
       console.log(error);
       return res.status(500).json({ error: error.message });
   }
}


const banner_all = async (req, res) => {
   try {
      const all = await banner.find();
      return res.status(200).json({ status: true, result: all })
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
}

const  banner_getone = async (req, res) => {
   var id = req.params.id
   const one = await banner.findById(id);
   return res.status(200).json({ status: true, result: one });
}

module.exports = { banner_add, banner_all, banner_delete, banner_update ,banner_getone};