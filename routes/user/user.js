const router = require("express").Router();
const { all_user, loginuser, adduser, changePassword, pagination, forgotpasstoken, forgotpassword, follow, totalfollowers } = require('../../controller/user');
const { auth } = require("../../middleware/auth");

router.get('/pagination', pagination);
router.post('/register', adduser);
router.post("/login", loginuser);
router.post("/follow/:id",auth,follow);
router.get("/totalfollow",auth,totalfollowers);
router.post("/emailsend",forgotpasstoken);
router.post("/forgot/:token",forgotpassword);
router.get("/all", all_user);
router.post("/changepassword", auth, changePassword);
module.exports = router;
