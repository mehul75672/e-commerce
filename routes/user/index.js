var router = require('express').Router();
const user = require("./user");
router.use("/api/admin/user", user);
module.exports=router;