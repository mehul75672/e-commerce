"use strict";
const path = require("path")
const category = require("../../model/category");
const fs = require("fs");
const category_add = async (req, res) => {
    const { category_name } = req.body;
    try {
        const add = new category({
            category_name,
            category_img: req.file.filename
        })
        await add.save();
        return res.status(201).json({ status: true, result: add });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const category_update = async (req, res) => {
    try {
        const id = req.params.id
        const get = await category.findById(id);
        let images
        if (req.file) {
            images = req.file.filename
            const filePath = path.join(__dirname, '../../public/images/'+get.category_img);
            fs.unlinkSync(filePath);
        } else {
            images = get.category_img
        }
        const result = await category.findByIdAndUpdate(id, {
            category_name: req.body.category_name,
            category_img: images
        })
        console.log(result);
        return res.status(201).json({ message: "category update success fully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const category_delete = async (req, res) => {
    const id = req.params.id
    try {
        const get = await category.findById(id);
        if (get) {
            const filePath = path.join(__dirname, '../../public/images/'+get.category_img);
            console.log(filePath);
            fs.unlinkSync(filePath);
            get.delete();
            return res.status(200).json("category delete successfully");
        } else {
            return res.status(400).json("category nod exist");
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

const category_get = async (req, res) => {
    const all = await category.find().limit(11);
    return res.status(200).json({ status: true, result: all });
}


module.exports = { category_add, category_delete, category_get, category_update };