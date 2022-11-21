const { wrapper_add, wrapper_all, data, alldata } = require('../../controller/wrapper');
const { upload } = require('../../middleware/uplode');

const router = require('express').Router();
router.post('/add', upload.single('wrapper_img'), wrapper_add);
router.get("/all", data);
router.get("/data", alldata);
module.exports = router;