var router = require('express').Router();

const product = require("./product")
const user = require("./user");
const like = require("./like_comments")
const category = require("./category")
const brands=require("./brands")
const banner=require("./banner");
const message = require('./message');
const Google_auth=require('./google_auth');

const prefix = "/api/user"
router.use(prefix, user);
router.use(prefix + "/product", product);
router.use(prefix+"/brands",brands)
router.use(prefix + "/category",category);
router.use(prefix+"/banners",banner)
router.use(prefix , like)
router.use(prefix ,message)
router.use(Google_auth)
module.exports = router;


