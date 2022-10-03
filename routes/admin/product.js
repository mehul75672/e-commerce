var router = require('express').Router();
const { product_add, product_all, product_delete, product_update } = require("../../controller/product");
const { upload } = require('../../middleware/uplode');

router.post("/add", upload.single("product_img"), product_add);
router.get("/all", product_all);
router.delete("/delete", product_delete);
router.put("/update/:id", upload.single("product_img"), product_update)
module.exports = router;