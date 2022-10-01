
var router = require('express').Router();

const category = require("./category");
const banner = require("./banner");
const brands = require("./brands");
const product = require('./product');
const wrapper = require('./Wrapper');

var prifix="/api/admin"
router.use(prifix+"/category", category);
router.use(prifix+"/banner", banner);
router.use(prifix+"/brands", brands);
router.use(prifix+"/product", product);
router.use(prifix+'/wrapper', wrapper);


module.exports=router;