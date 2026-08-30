const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'product'
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be atleast 1!']
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'Online'],
        default: 'Cash',
        required: true
    },
    address: {
        street: { type: String, required: true, },
        city: { type: String, required: true, },
        state: { type: String, required: true, },
        zipCode: { match: [/^[0-9]{4,6}$/, 'zip code must be valid!'], type: String, required: true, },
        country: { type: String, required: true, }
    },
    totalPrice: { type: Number, required: true },
    totalItems: { type: Number, required: true }
}, {
    timestamps: true
})

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;