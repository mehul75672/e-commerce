const router = require("express").Router();
const { auth } = require("../../middleware/auth");
const { like, totallike, comment_add } = require('../../controller/like_comments');





router.post("/like/:id",auth ,like);
router.get("/allproduct",totallike);
router.post("/comment/:id",auth,comment_add)

module.exports = router;