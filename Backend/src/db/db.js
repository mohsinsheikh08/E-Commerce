const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            family: 4,
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            tls: true
        });
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.log(`❌ MongoDB connection error: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;