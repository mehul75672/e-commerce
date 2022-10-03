var router = require('express').Router();

const product=require("./product")
const user = require("./user");
const like=require("./like")

const prefix = "/api/user"
router.use(prefix, user);
router.use(prefix+"/product",product);
router.use(prefix+"/like",like)
module.exports = router;


