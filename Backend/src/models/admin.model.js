const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: [true, 'Busniess name is required'],
        minlength: [3, 'Busniess name must be longer than 3 charachters!']
    },
    businessType: {
        type: String,
        enum: ['E-commerce', 'Restaurant', 'Retail', 'Service', 'Wholesale', 'Other'],
        required: true
    },
    adminName: {
        type: String,
        required: true,
        minlength: [3, 'Admin name must be longer than 3 chrachters!']
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email!'],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 charachters longer!'],
        select: false
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required!'],
        trim: true,
        match: [/^[0-9+\-() ]{10,15}$/, 'Please enter a valid phone number!']
    },
    adminImage: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street is required!'],
            trim: true,
        },
        city: {
            type: String,
            required: [true, 'City is required!'],
            trim: true
        },
        state: {
            type: String,
            required: [true, 'State is required!'],
            trim: true
        },
        zipCode: {
            type: String,
            required: [true, 'Zip code is required!'],
            trim: true,
            match: [/^[0-9]{4,6}$/, 'Please enter a valid zip code!']
        },
        country: {
            type: String,
            default: 'Pakistan'
        }
    },
    role: {
        type: String,
        enum: ['super_admin', 'product_admin', 'order_manager', 'user_manager'],
        default: 'product_admin'
    }

}, {
    timestamps: true
})


const adminModel = mongoose.model('admin', adminSchema)

module.exports = adminModel