const router = require("express").Router();
const { auth } = require("../../middleware/auth");
const { like_add, like, totallike } = require('../../controller/like_comments');



router.post("/likeadd", like_add);
router.post("/:id",auth ,like);
router.get("/all",totallike);


module.exports = router;