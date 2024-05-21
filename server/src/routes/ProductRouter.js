const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create', productController.createProduct);
router.put('/update/:id', authMiddleware, productController.updateProduct);
router.get('/details/:id', productController.getProductDetails);
router.get('/get-all', productController.getAllProduct);
router.delete('/delete/:id',authMiddleware, productController.deleteProduct);

module.exports = router;
