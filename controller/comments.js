const comments = require("../model/comments");
const like_comments = require("../model/like_comments");

const comment_add = async (req, res) =>{
    const user = req.send 
    const comment = new comments({
        name: user.firstname,
        email: user.email,
        user_id: user.id,
        comment: req.body.comment
    });
    await comment.save();
    await like_comments.findOneAndUpdate({ _id: req.body._id }, { $push: { comment } })
    res.send("Comment was added successfully");
}
module.exports = (comment_add)  