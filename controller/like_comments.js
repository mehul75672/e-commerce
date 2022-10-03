
const like_comments = require("../model/like_comments");


const like_comments_add = async (req, res) => {
    try {
        const { name, price } = req.body
        const add = new like_comments({
            name,
            price
        })
        add.save();
        return res.status(200).json(add);
    } catch (error) {
        return res.status(500).json({ error: error.messages })
    }
}


const like = async (req, res) => {
    let id = req.params.id
    let find = await like_comments.findById(id);
    let user = req.send;
    var a = await find.like.includes(user.id);
    if (a) {
        await like_comments.findByIdAndUpdate(id, { $pull: { like: user.id } })
        return res.status(200).json("unlike");
    }
    else {
        await like_comments.findByIdAndUpdate(id, { $push: { like: user.id } })
        return res.status(200).json("like")
    }
}


const totallike = async (req, res) => {
    try {
        const a = await like_comments.aggregate([
            {
                $addFields: {
                    "totallike": { $size: "$like" }
                }
            }
        ]);
        res.send(a);

    } catch (error) {
        return res.status(500).json({ error: error.messages })
    }
}
module.exports = { like_comments_add, like, totallike }; 