var router = require('express').Router();
const { brands_add, brands_all, brands_delete, brands_getone, brands_update } = require("../../controller/brands")
const { upload } = require("../../middleware/uplode")


router.post("/add", upload.single("img"), brands_add);
router.put("/update/:id",upload.single("img"),brands_update);
router.delete("/delete/:id", brands_delete);
router.get("/all", brands_all);
router.get("/getone/:id",brands_getone);
module.exports = router ;   