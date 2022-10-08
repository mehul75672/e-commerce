var router = require('express').Router();
const { category_get} = require("../../controller/category");
router.get('/all', category_get);

module.exports = router;