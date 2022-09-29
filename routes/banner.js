var router = require('express').Router();
const {banner_add,banner_all,banner_delete}=require("../controller/banner")
const {upload}=require("../middleware/uplode")


router.post("/add",upload.single("banner_img"),banner_add);
router.get("/all",banner_all);
router.delete("/delet",banner_delete)

module.exports =router