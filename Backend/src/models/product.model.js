const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minlength: [3, "Product name must be longer than 3 charachters"]
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['Electronics', 'Clothing', 'Books', 'Food', 'Home', 'Beauty', 'Other'],
        default: 'Other'
    },
    mainImage: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    brandName: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']
    },
    color: {
        type: String,
        enum: ['Black', 'White', 'Red', 'Blue', 'Brown', 'Green', 'Yellow', 'Gold', 'Silver', 'Pink', 'Purple']
    },
    discount: {
        type: Number,
        min: [0, "discount amount must not be negative!"],
        validate: {
            validator: function (value) {
                if (value < this.price) {
                    return true
                } else { return false }
            }
        },
        message: "Discount must be less than product amount!"
    },
    tax: {
        type: Number,
        default: 0,
        minlenth: [0, 'Tax cannot be negative!'],
        maxlength: [100, 'Tax cannot exceed 100%']
    },
    sellerInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    }
}, {
    timestamps: true
})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel