const express = require('express')
const authController = require('../controllers/auth.controller.js')
const router = express();
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
router.post('/register', authController.userRegister)
router.post('/login', authController.userLogin)
router.get('/logout', authController.userLogout)

router.post('/admin-register', upload.single('adminImage'), authController.adminRegister)
router.post('/admin-login', authController.adminLogin)
router.get('/admin-logout', authController.adminLogout)
router.get('/admin-info', authController.AdminInfo)

router.get('/admin-stats', authController.getStats)
router.get('/admin-orders', authController.getAllOrders)
router.get('/admin-products', authController.getAllProducts)
router.get('/admin-users', authController.getAllUsers)
module.exports = router