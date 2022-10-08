const { brands_all } = require('../../controller/brands');

var router = require('express').Router();

router.get('/all',brands_all);

module.exports = router;