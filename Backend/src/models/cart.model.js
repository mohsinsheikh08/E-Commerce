const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: [true, 'Product is required!']
        },
        quantity: {
            type: Number,
            min: [1, 'Quantity must be atlest 1!'],
            default: 1,
            required: true
        },
        price: {
        type: Number,
        min : [0, 'price cannot be negative!'],
        required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    totalItems: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    }
})

const cartModel = mongoose.model('cart', cartSchema)

module.exports = cartModel;