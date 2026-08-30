const express = require('express')
const productController = require('../controllers/product.controller.js')
const router = express();
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const productMiddleware = require('../middleware/product.middleware.js')
router.post('/create-product', upload.single('mainImage'), productController.createProduct)
router.get('/all-products', productController.getAllProducts)
router.get('/:id', productController.getProduct)
router.patch('/:id', productMiddleware.tokenChecker, productController.editProduct)
router.delete('/:id', productMiddleware.tokenChecker, productController.deleteProduct)
module.exports = router;