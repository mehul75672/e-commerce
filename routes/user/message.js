const router = require("express").Router();
const { auth } = require("../../middleware/auth");
const { message, twousermessagget, groupcreate, groupmessage, groupallmessagget, oneuseradd } = require("../../controller/message")

router.post("/message/:id", auth, message)
router.get("/message/get/:id", auth, twousermessagget)
router.post("/group/create", auth, groupcreate);
router.post("/group/messages/:id", auth, groupmessage)
router.post("/group/oneuseradd/:id", auth, oneuseradd)
router.get("/groupmessages/:id",auth, groupallmessagget)
module.exports = router;