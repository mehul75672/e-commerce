var router = require('express').Router();
const product=require("./product")
const user = require("./user");


const prefix = "/api/user"
router.use(prefix + "/user", user);
router.use(prefix+"/product",product);
module.exports = router;