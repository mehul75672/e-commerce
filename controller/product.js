"use strict";
const product = require("../model/product");

const fs = require("fs");
const { json } = require("express");

const product_add = async (req, res) => {
    try {
        console.log(req.file);
        const add = new product({
            category_id: req.body.category_id,
            brands_id: req.body.brands_id,
            name: req.body.name,
            product_img: req.file.filename,
            price: req.body.price,
            discount: req.body.discount
        })
        await add.save();
        return res.status(201).json("product add succassfully");

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const product_all = async (req, res) => {
    try {
        const all = await product.aggregate([
            {
                $lookup: {
                    from: 'categries',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category'
                },
            }, {
                $lookup: {
                    from: 'brands',
                    localField: 'brands_id',
                    foreignField: '_id',
                    as: 'brands'
                }
            }])
        return res.status(200).json({ status: true, result: all });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const product_delete = async (req, res) => {
    try {
        let id = res.params.id
        let get = await product.findById(id);
        if (get) {

            fs.unlinkSync('./public/images/' + get.product_img);
            get.delete();
            return res.status(200).json("product delete succass fully");

        } else {
            return res.status(400).json("product not exist");
        }
    } catch (error) {
        return res.status(500), json({ error: error.message });
    }
}

const product_discount = async (req, res) => {
    try {
        const discount = await product.find({ discount: { $gt: 50 } });
        return res.status(200).json({ status: true, result: discount })
    } catch (error) {
        return res.status(500), json({ error: error.message });
    }
}

const new_arrivals = async (req, res) => {
    try {
        const discount = await product.find({
            "createdAt": {
                $lt: new Date(),
                $gte: new Date(new Date().setDate(new Date().getDate() - 5))
            }
        }).limit(6);
        return res.status(200).json({ status: true, result: discount })
    } catch (error) {
        return res.status(500), json({ error: error.message });
    }
}

const productget = async (req, res) => {
    const id = req.params.id
    try {
        const discount = await product.find({ brands_id: id });
        return res.status(200).json({ status: true, result: discount })
    } catch (error) {
        return res.status(500), json({ error: error.message });
    }
}

module.exports = { product_add, product_all, product_delete, product_discount, new_arrivals, productget };