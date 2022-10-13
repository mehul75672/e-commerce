"use strict";
const path = require("path")
const category = require("../model/category");
const fs = require("fs");
const product = require("../model/product");

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
        console.log(error);
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
            const filePath = path.join(__dirname, process.env.images + get.category_img);
            fs.unlinkSync(filePath);
        } else {
            images = get.category_img
        }
        const result = await category.findByIdAndUpdate(id, {
            category_name: req.body.category_name,
            category_img: images
        }, { new: true })
        return res.status(201).json({ status: false, message: "category update success fully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const category_delete = async (req, res) => {
    const id = req.params.id
    try {
        const get = await category.findById(id);
        if (get) {
            const filePat = path.join(__dirname, process.env.images + get.category_img);
            console.log(filePat);
            fs.unlinkSync(filePat);
            get.delete();
            const ge = await product.findOne({ category_id: get.id });
            if (ge) {
                const filePath = path.join(__dirname, process.env.images + ge.product_img);
                console.log(filePath);
                fs.unlinkSync(filePath);
                ge.delete();
            }
            return res.status(200).json({ status: false, message: "category delete successfully" });
        } else {
            return res.status(400).json({ status: false, message: "category not exist" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

const category_get = async (req, res) => {
    try {
        const all = await category.find().limit(11);
        return res.status(200).json({ status: true, result: all });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.messages })
    }
}

const category_getone = async (req, res) => {
    try {
        var id = req.params.id
        const one = await category.findById(id);
        return res.status(200).json({ status: true, result: one });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.messages })
    }
}

module.exports = { category_add, category_delete, category_get, category_update, category_getone };