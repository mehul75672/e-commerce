var router = require('express').Router();
const { product_add, product_all, product_delete, product_discount, new_arrivals, productget } = require("../../controller/admin/product");
const { upload } = require('../../middleware/uplode');

router.post("/add", upload.single("product_img"), product_add);
router.get("/all", product_all);
router.delete("/delete", product_delete);
router.get('/discount', product_discount);
router.get('/new', new_arrivals);
router.get('/get/:id', productget);
module.exports = router;