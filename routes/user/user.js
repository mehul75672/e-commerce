const router = require("express").Router();
const { all_user, loginuser, adduser, changePassword, pagination } = require('../../controller/user');
const { auth } = require("../../middleware/auth");

router.get('/pagination', pagination);
router.post('/registr', adduser);
router.post("/login", loginuser);
router.get("/all", all_user);
router.post("/changepassword", auth, changePassword);
module.exports = router;
