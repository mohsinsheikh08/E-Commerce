const productModel = require('../models/product.model.js');
const cartModel = require('../models/cart.model.js');
const jwt = require('jsonwebtoken');

const updateCartTotals = async (cart, taxRate = 10) => {
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => {
        const subtotal = item.price * item.quantity;
        const taxAmount = (subtotal * taxRate) / 100;
        return total + subtotal + taxAmount;
    }, 0);
    await cart.save();
    await cart.populate('items.product', 'productName price stock mainImage');
    return cart;
};

const createCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const token = req.cookies.token;
        
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ success: false, message: `Stock not available! You can only buy ${product.stock} items.` });
        }

        let cart = null;
        let userId = null;
        
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                if (decoded.role === "User") {
                    userId = decoded.id;
                    cart = await cartModel.findOne({ user: userId });
                }
            } catch (err) {
            }
        }

        if (!cart) {
            let guestId = req.headers['guest-id'];
            if (!guestId) {
                guestId = 'guest_' + Math.random().toString(36).substring(2, 15) + Date.now();
            }
            cart = await cartModel.findOne({ guestId });
            
            if (!cart) {
                cart = new cartModel({
                    guestId,
                    items: [],
                    totalPrice: 0,
                    totalItems: 0
                });
            }
        }

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

        const tax = product.tax || 10;
        await updateCartTotals(cart, tax);

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully!",
            cart,
            guestId: cart.guestId || null,
            isUserLoggedIn: !!userId
        });

    } catch (err) {
        console.error('Cart Error:', err.message);
        return res.status(500).json({ success: false, message: "Something went wrong!", error: err.message });
    }
};

const getCart = async (req, res) => {
    try {
        const token = req.cookies.token;
        let cart = null;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                if (decoded.role === "User") {
                    cart = await cartModel.findOne({ user: decoded.id }).populate('items.product', 'productName price stock mainImage');
                }
            } catch (err) {
            }
        }

        if (!cart) {
            const guestId = req.headers['guest-id'];
            if (guestId) {
                cart = await cartModel.findOne({ guestId }).populate('items.product', 'productName price stock mainImage');
            }
        }

        return res.status(200).json({
            success: true,
            cart: cart || { items: [], totalPrice: 0, totalItems: 0 },
            message: cart ? "Cart fetched successfully!" : "Cart is empty!"
        });

    } catch (err) {
        return res.status(200).json({ success: true, cart: { items: [], totalPrice: 0, totalItems: 0 }, message: "Something went wrong!" });
    }
};

const editQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { id } = req.params;
        const token = req.cookies.token;
        
        let cart = null;
        let userId = null;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                if (decoded.role === "User") {
                    userId = decoded.id;
                    cart = await cartModel.findOne({ user: userId });
                }
            } catch (err) { }
        }

        if (!cart) {
            const guestId = req.headers['guest-id'];
            if (guestId) {
                cart = await cartModel.findOne({ guestId });
            }
        }

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.product.toString() === id);

        if (!item) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (quantity <= 0) {
            cart.items = cart.items.filter(item => item.product.toString() !== id);
        } else {
            item.quantity = quantity;
        }

        await updateCartTotals(cart);
        return res.status(200).json({ message: "Cart updated successfully!", cart });

    } catch (err) {
        return res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.cookies.token;

        let cart = null;
        let userId = null;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                if (decoded.role === "User") {
                    userId = decoded.id;
                    cart = await cartModel.findOne({ user: userId });
                }
            } catch (err) { }
        }

        if (!cart) {
            const guestId = req.headers['guest-id'];
            if (guestId) {
                cart = await cartModel.findOne({ guestId });
            }
        }

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.product.toString() !== id);
        await updateCartTotals(cart);

        return res.status(200).json({ message: "Product deleted successfully!", cart });

    } catch (err) {
        return res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

module.exports = { createCart, getCart, editQuantity, deleteProduct };