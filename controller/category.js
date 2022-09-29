const category = require("../model/category");
const fs = require("fs");
const category_add = async (req, res) => {
    const { category_name } = req.body;
    try {
        const add = new category({
            category_name,
            category_img: req.file.filename
        })
        await add.save();
        return res.status(200).json(add);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const category_delete = async (req, res) => {
    const id = req.params.id
   
    try {

        const get = await category.findById(id);
        console.log(get.category_img);
        if (get) {
            fs.unlinkSync('./public/images/' + get.category_img);
            get.delete();
            return res.status(200).json("category delete successfully");
        } else {
            return res.status(400).json("category nod exist");
        }
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
  const category_get=async(req,res)=>{
    const all= await category.find().limit(11);
    return res.status(200).json(all)
  }


module.exports = { category_add, category_delete ,category_get };