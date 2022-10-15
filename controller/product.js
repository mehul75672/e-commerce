"use strict"
const product = require("../model/product");

const fs = require("fs");
const path = require("path")



//admin  
const product_add = async (req, res) => {
    try {
        if (req.body.discount >= 100) {
            return res.status(400).json({ status: false, message: "discount min 100" });
        }
        let a = req.body.tags
        const add = new product({
            category_id: req.body.category_id,
            brands_id: req.body.brands_id,
            tags: a,
            name: req.body.name,
            product_img: req.file.filename,
            price: req.body.price,
            discount: req.body.discount
        })
        await add.save();
        return res.status(201).json({ status: true, message: "product add successfully", result: add });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const product_all = async (req, res) => {
    try {
        const all = await product.aggregate([{ $match: {} },
        {
            $lookup: {
                from: 'brands',
                localField: 'brands_id',
                foreignField: '_id',
                as: 'brands'
            }
        },
        {
            $unwind: {
                path: "$brands",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category_id',
                foreignField: '_id',
                as: 'category'
            },

        },
        {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "name": 1,
                "product_img": 1,
                "price": 1,
                "discount": 1,
                "brands.name": 1,
                "category.category_name": 1,
                "tags": 1
            }
        }
        ]);
        return res.status(200).json({ status: true, result: all });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const product_update = async (req, res) => {
    try {
        const id = req.params.id
        const get = await product.findById(id);
        let images
        if (req.file) {
            images = req.file.filename
            const filePath = path.join(__dirname, process.env.images + get.product_img);
            fs.unlinkSync(filePath);
        } else {
            images = get.product_img
        }
        const result = await product.findByIdAndUpdate(id, {
            category_id: req.body.category_id,
            brands_id: req.body.brands_id,
            name: req.body.name,
            product_img: images,
            price: req.body.price,
            discount: req.body.discount
        }, { new: true })
        console.log(result);
        return res.status(201).json({ status: true, message: "product update success fully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const product_delete = async (req, res) => {
    const id = req.params.id
    try {
        const get = await product.findById(id);
        if (get) {
            const filePath = path.join(__dirname, process.env.images + get.product_img);
            console.log(filePath);
            fs.unlinkSync(filePath);
            get.delete();
            return res.status(200).json({ status: true, message: "product delete successfully" });
        } else {
            return res.status(400).json({ status: false, message: "product not exist" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

const product_getone = async (req, res) => {
    var id = req.params.id
    const one = await product.findById(id);
    return res.status(200).json({ status: true, result: one });
}


//user 
const product_discount = async (req, res) => {
    try {
        const discount = await product.find({ discount: { $gt: 50 } });
        return res.status(200).json({ status: true, result: discount })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const get = async (req, res) => {
    try {
        let a = req.body.tags
        const tags = await product.find({ tags: a })
        return res.status(200).json({status:true,result:tags});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const searc = async (req, res) => {
    try {
        const a = await product.find({ $or: [{ tags: { '$regex': req.query.dsearch } }, { name: { '$regex': req.query.dsearch } }] })
        return res.status(200).json(a);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


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
        return res.status(500).json({ error: error.message });
    }
}


const productgetbrands = async (req, res) => {
    const id = req.params.id
    try {
        const discount = await product.find({ brands_id: id });
        return res.status(200).json({ status: true, result: discount })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = { product_add, product_all, product_delete, product_discount, new_arrivals, productgetbrands, product_update, product_getone, get, searc };














// let a = []
// const all = await product.find().populate("category_id", "category_name").populate("brands_id", "name");
// all.map((f) => {
//     a.push({ category_name: f.category_id.category_name })
//     })