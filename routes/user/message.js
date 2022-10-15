const router = require("express").Router();
const { auth } = require("../../middleware/auth");
const {message,allmessag} = require("../../controller/message")

router.post("/message/:id", auth, message)
router.get("/message/get/:id",auth,allmessag)
module.exports = router;