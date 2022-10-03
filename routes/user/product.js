const { product_discount, new_arrivals, productget } = require('../../controller/product');

var router = require('express').Router();

router.get('/discount',product_discount);
router.get('/new',new_arrivals); 
router.get('/get/:id',productget);
module.exports=router;