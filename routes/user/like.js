const router = require("express").Router();
const { auth } = require("../../middleware/auth");
const { like_comments_add, like, totallike } = require('../../controller/like_comments');



router.post("/likeadd", like_comments_add);
router.post("/:id",auth ,like);
router.get("/all",totallike);


module.exports = router;