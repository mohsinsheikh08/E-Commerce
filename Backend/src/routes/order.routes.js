const express = require('express');
const orderController = require('../controllers/order.controller')
const router = express();

router.post('/add-order', orderController.createModel);
router.get('/my-orders', orderController.getMyOrders);
router.get('/all-orders', orderController.getOrders);
router.get('/:id', orderController.order)
router.patch('/:id', orderController.editOrder)
module.exports = router