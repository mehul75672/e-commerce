const { product_discount, new_arrivals, productgetbrands, get, searc } = require('../../controller/product');

var router = require('express').Router();

router.get('/discount',product_discount);
router.get('/newarrivals',new_arrivals); 
router.get('/:id',productgetbrands);
router.post('/tags',get);
router.post('/search',searc)
module.exports=router;