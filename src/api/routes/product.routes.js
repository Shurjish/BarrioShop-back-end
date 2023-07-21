const express = require('express');
const upload = require('../../middlewares/upload.file');

const router = express.Router();

const {
    getProduct,
    modProduct,
    deleteProduct,
    getProductById,
    postProduct,
} = require('../controllers/product.controller');

router.get('/products', getProduct);
router.post('/', upload.single('image'), postProduct);
router.put('/:id', modProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProductById);

module.exports = router;
