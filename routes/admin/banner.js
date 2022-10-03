var router = require('express').Router();
const { banner_add, banner_all, banner_delete, banner_update, banner_getone } = require("../../controller/banner")
const { upload } = require("../../middleware/uplode")

router.post("/add", upload.single("banner_img"), banner_add);
router.get("/all", banner_all);
router.get("/getone/:id", banner_getone);
router.delete("/delete/:id", banner_delete);
router.put("/update/:id",upload.single("banner_img"),banner_update);

module.exports = router;