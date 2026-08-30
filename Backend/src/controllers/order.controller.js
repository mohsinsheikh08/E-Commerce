const orderModel = require('../models/order.model.js');
const cartModel = require('../models/cart.model.js')
const jwt = require('jsonwebtoken')
const createModel = async (req, res) => {
    try {
        const { paymentMethod, address: { street, city, state, zipCode, country } } = req.body;
        const token = req.cookies.token;
        if (!token) {
            return res.status(409).json({
                message: "Invalid credintials!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.role !== "User") {
            return res.status(409).json({
                message: "This page is only accessible for users!"
            })
        }
        const userId = decoded.id
        const cart = await cartModel.findOne({ user: userId })
        if (!cart || cart.items.length === 0) {
            return res.status(409).json({
                message: "Cart is empty!"
            })
        }
        console.log('Cart Items:', cart.items);
        const order = await orderModel.create({
            user: userId,
            items: cart.items.map(item => ({
                product: item.product,
                quantity: item.quantity,
                price: item.price
            })),
            paymentMethod: paymentMethod,
            address: {
                street: street,
                city: city,
                state: state,
                zipCode: zipCode,
                country: country
            },
            totalPrice: cart.totalPrice,
            totalItems: cart.totalItems
        })
        res.status(201).json({
            message: "Order placed successfully!",
            order: order
        })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}

const getOrders = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(409).json({
                message: "Invalid credentials! Please login first."
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (decoded.role === "User") {
            return res.status(409).json({
                message: "This page can only be accessed by admin!"
            });
        }

        const orders = await orderModel.find()
            .populate('user', 'fullName email')
            .populate('items.product', 'productName price');

        res.status(200).json({
            message: "All orders fetched!",
            orders: orders
        });
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (decoded.role === "Admin") {
            return res.status(409).json({
                message: "This page can only accessible only for users!"
            })
        }
        const userId = decoded.id
        const order = await orderModel.find({ user: userId })
             .populate({
                path: 'items.product',
                select: 'productName price mainImage',
                options: { strictPopulate: false }
            })
            .sort({ createdAt: -1 })

            return res.status(200).json({
                message: "Orders fetched successfully!",
                order: order
            })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}
const order = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await orderModel.findById(id);

        res.status(200).json({
            message: "Order fetched successfully!",
            order: order
        })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}

const editOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.cookies.token;
        if (!token) {
            return res.status(409).json({
                message: "Invalid credintials!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.role !== "Admin") {
            return res.status(409).json({
                message: "This page is accessilbe only for admins!"
            })
        }
        const update = req.body;
        const edit = await orderModel.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )
        res.status(200).json({
            message: "Order edited successfully!",
            edit: edit
        })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}
module.exports = { createModel, getOrders, order, editOrder, getMyOrders }
