const { wrapper_add, wrapper_all } = require('../../controller/wrapper');
const { upload } = require('../../middleware/uplode');

const router = require('express').Router();
router.post('/add', upload.single('wrapper_img'), wrapper_add);
router.get("/all", wrapper_all);

module.exports = router;