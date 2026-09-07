const productModel = require('../models/product.model.js');
const cartModel = require('../models/cart.model.js');
const jwt = require('jsonwebtoken');

const createCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided!"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (decoded.role !== "User") {
            return res.status(403).json({
                success: false,
                message: "Forbidden! Only users can add to cart."
            });
        }

        const userId = decoded.id;
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: `Stock not available! You can only buy ${product.stock} items.`
            });
        }

        let cart = await cartModel.findOne({ user: userId });

        if (cart) {
            const isExist = cart.items.find(
                item => item.product.toString() === id
            );

            if (isExist) {
                isExist.quantity += quantity;
            } else {
                cart.items.push({
                    product: product._id,
                    quantity: quantity,
                    price: product.price
                });
            }

            const tax = product.tax || 0;
            cart.totalPrice = cart.items.reduce((total, item) => {
                const subtotal = item.price * item.quantity;
                const taxAmount = (subtotal * tax) / 100;
                return total + subtotal + taxAmount;
            }, 0);

            cart.totalItems = cart.items.reduce((total, item) => {
                return total + item.quantity;
            }, 0);

            await cart.save();
            await cart.populate('items.product', 'productName price mainImage');

            return res.status(200).json({
                success: true,
                message: "Product added to cart successfully!",
                cart
            });
        }
        const tax = product.tax || 0;
        const subtotal = product.price * quantity;
        const taxAmount = (subtotal * tax) / 100;
        const totalPrice = subtotal + taxAmount;

        const newCart = await cartModel.create({
            user: userId,
            items: [{
                product: product._id,
                quantity: quantity,
                price: product.price
            }],
            totalPrice: totalPrice,
            totalItems: quantity
        });

        await newCart.populate('items.product', 'productName price mainImage');

        return res.status(201).json({
            success: true,
            message: "Product added to cart successfully!",
            cart: newCart
        });

    } catch (err) {
        console.error('Cart Error:', err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: err.message
        });
    }
};

const getCart = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(409).json({
                message: "Invalid credintials!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        if (decoded.role !== "User") {
            return res.status(409).json({
                message: "This page can be accissable only for users!"
            })
        }
        const userId = decoded.id;
        const cart = await cartModel.findOne({ user: userId }).populate('items.product', 'productName price stock mainImage')

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty!"
            });
        }
        res.status(200).json({
            success: true,
            cart: cart
        });
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }

}

const editQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { id } = req.params
        const token = req.cookies.token;
        if (!token) {
            return res.status(409).json({
                message: "Invalid credintials!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        if (decoded.role !== "User") {
            return res.status(409).json({
                message: "This page can be accissable only for users!"
            })
        }
        const userId = decoded.id;

        const cart = await cartModel.findOne({ user: userId })

        if (!cart) {
            return res.status(409).json({
                message: "cart not found"
            })
        }
        const item = cart.items.find(item => item.product.toString() === id);

        if (!item) {
            return res.status(409).json({
                message: "product not found"
            })
        }

        if (quantity <= 0) {
            cart.items = cart.items.filter(item => item.product.toString() !== id);

        } else {
            item.quantity = quantity;
        }
        cart.totalItems = cart.items.reduce((total, item) => {
            return item.quantity + total
        }, 0)
        await cart.save();

        await cart.populate('items.product', 'productName price mainImage');
        res.status(201).json({
            message: "Cart updated successfully!",
            cart
        })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const token = req.cookies.token;
        if (!token) {
            return res.status(409).json({
                message: "Invalid credintials!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        if (decoded.role !== "User") {
            return res.status(409).json({
                message: "This page can be accissable only for users!"
            })
        }
        const userId = decoded.id;
        const cart = await cartModel.findOne({ user: userId });
        cart.items = cart.items.filter(item => item.product.toString() !== id);
        cart.totalItems = cart.items.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
        const tax = 10;
        cart.totalPrice = cart.items.reduce((total, item) => {
            const subtotal = item.price * item.quantity;
            const taxAmount = (subtotal * tax) / 100;
            return total + subtotal + taxAmount;
        }, 0);

        await cart.save();

        await cart.populate('items.product', 'productName price mainImage');

        return res.status(200).json({
            message: "Product delted successfully!",
            cart: cart
        })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}
module.exports = { createCart, getCart, editQuantity, deleteProduct }; 