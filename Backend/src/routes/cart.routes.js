const express = require('express')
const cartController = require('../controllers/cart.controller')
const router = express();

router.post('/item/:id', cartController.createCart)
router.get('/cart', cartController.getCart)
router.patch('/:id', cartController.editQuantity)
router.delete('/:id', cartController.deleteProduct)
module.exports = router