"use strict";
const brands = require("../model/brands");
const path = require("path");
const fs = require("fs");
const product = require("../model/product");

const brands_add = async (req, res) => {
   try {
      const add = new brands({
         name: req.body.name,
         img: req.file.filename
      })
      await add.save();
      return res.status(201).json({ status: true, result: add });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
}

const brands_delete = async (req, res) => {
   try {
      const id = req.params.id
      const get = await brands.findById(id);
      if (get) {
         const filePat = path.join(__dirname, process.env.images + get.img);
         fs.unlinkSync(filePat);
         get.delete();
         const ge = await product.findOne({ brands_id: get.id });
         if (ge) {
            const filePath = path.join(__dirname, process.env.images + ge.product_img);
            fs.unlinkSync(filePath);
            ge.delete();
         }
         return res.status(200).json({ status: true, message: "brands delete successfully" });
      } else {
         return res.status(404).json({ status: false, message: "brands not exist" });
      }
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
}

const brands_update = async (req, res) => {
   try {
      const id = req.params.id
      const get = await brands.findById(id);
      let images
      if (req.file) {
         images = req.file.filename
         const filePath = path.join(__dirname, process.env.images + get.img);
         fs.unlinkSync(filePath);
      } else {
         images = get.img
      }
      const result = await brands.findByIdAndUpdate(id,
         {
            $set: {
               name: req.body.name,
               img: images
            }
         }, { new: true })
      return res.status(200).json({ status: true, message: result });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
   }
}

const brands_all = async (req, res) => {
   try {
      const all = await brands.find();
      return res.status(200).json({ status: true, result: all });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
}

const brands_getone = async (req, res) => {
   try {
      var id = req.params.id
      const one = await brands.findById(id);
      return res.status(200).json({ status: true, result: one });
   } catch (error) {
      return res.status(500).json({ status: false, error: error.messages })
   }
}
module.exports = { brands_add, brands_delete, brands_update, brands_all, brands_getone };