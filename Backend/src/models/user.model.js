const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be longer than 3 charachters!'],
            trim: true
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be longer than 3 charachters!'],
            trim: true
        }
    },
    email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Email is not valid!'],
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, "Password must be longer than 8 charachters!"]
    }, role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
}, {
    timestamps: true
})


const userModel = mongoose.model('User', userSchema)

module.exports = userModel