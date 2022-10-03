
var router = require('express').Router();
const { category_add, category_delete, category_get, category_update, category_getone } = require("../../controller/category");
const { upload } = require("../../middleware/uplode")

router.post('/add', upload.single("category_img"), category_add);
router.delete('/delete/:id', category_delete);
router.get('/all', category_get);
router.put("/update/:id",upload.single("category_img"),category_update)
router.get('/getone/:id', category_getone);
module.exports = router;
