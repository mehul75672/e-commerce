var router = require('express').Router();
const { brands_add, brands_all, brands_delete } = require("../../controller/admin/brands")
const { upload } = require("../../middleware/uplode")


router.post("/add", upload.single("img"), brands_add);
router.get("/all", brands_all);
router.delete("/delet", brands_delete)

module.exports = router 