const product = require("../model/product");
const User = require("../model/User");

const like = async (req, res) => {
    let id = req.params.id
    let find = await product.findById(id);
    let user = req.send;
    var a = await find.like.includes(user.id);
    if (a) {
        await product.findByIdAndUpdate(id, { $pull: { like: user.id } })
        return res.status(200).json({ messages: "unlike" });
    }
    else {
        await product.findByIdAndUpdate(id, { $push: { like: user.id } })
        return res.status(200).json({ messages: "like" })
    }
}

const totallike = async (req, res) => {
    try {
        const a = await product.aggregate([
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



const comment_add = async (req, res) => {
    let id = req.params.id
    let user = req.send;
    await product.findByIdAndUpdate(id, {
        $push: {
            comments: {
                text: req.body.text,
                user_id: user.id
            }
        }
    })
    return res.status(200).json({ messages: "comments" });
}
module.exports = { like, totallike, comment_add }; 




