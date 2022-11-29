var router = require('express').Router();
const { auth } = require('../../middleware/auth');
const {order,total_sales} = require('../../controller/order');

router.post('/order',auth,order)
router.get("/sales",total_sales)
module.exports=router;
