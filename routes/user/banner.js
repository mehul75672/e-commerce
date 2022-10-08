const { banner_all } = require('../../controller/banner');


var router = require('express').Router();

router.get('/all',banner_all);

module.exports = router;