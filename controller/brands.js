"use strict";
const brands = require("../model/brands");
const fs = require("fs");

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
      const get = banner.findById(id);
      if (get) {
         fs.unlinkSync('./public/images/' + get.img);
         get.delete();
         return res.status(200).json("banner delete successfully");
      } else {
         return res.status(404).json("banner not exist");
      }

   } catch (error) {
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

module.exports = { brands_add, brands_all, brands_delete };