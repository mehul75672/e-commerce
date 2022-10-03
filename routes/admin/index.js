
var router = require('express').Router();

const category = require("./category");
const banner = require("./banner");
const brands = require("./brands");
const product = require('./product');
const wrapper = require('./Wrapper');

var prefix = "/api/admin"
router.use(prefix + "/category", category);
router.use(prefix + "/banner", banner);
router.use(prefix + "/brands", brands);
router.use(prefix + "/product", product);
router.use(prefix + '/wrapper', wrapper);


module.exports = router;