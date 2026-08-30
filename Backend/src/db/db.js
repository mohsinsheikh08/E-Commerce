const mongoose = require('mongoose');

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGODB, {
    maxPoolSize: 10,
    minPoolSize: 5,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 3000,
    family: 4
  })
  console.log("MongoDB connected successfully!")
  }catch(err){
    console.log("MongoDB is not connected!")
  }
}

module.exports = connectDB;

