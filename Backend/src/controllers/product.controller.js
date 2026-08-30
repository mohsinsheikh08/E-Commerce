const productModel = require('../models/product.model.js')
const jwt = require('jsonwebtoken')
const uploadFile = require('../service/product.service.js')
const createProduct = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
           return  res.status(409).json({
                message: "Invalid Creadintials"
            })
        }
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid credintials!"
            })
        }
        if (decoded.role === "User") {
            return res.status(403).json({
                message: "User can not access this page!"
            })
        }
        const { productName, description, price, category, stock, brandName, size, color, discount, tax } = req.body;
        const result = await uploadFile(req.file.buffer)
        const product = await productModel.create({
            productName: productName,
            description: description,
            price: price,
            category: category,
            mainImage: result.url,
            stock: stock,
            brandName: brandName,
            size: size,
            color: color,
            discount: discount,
            tax: tax,
            sellerInfo: decoded.id
        })
        res.status(201).json({
            message: "Product created successfully!",
            success: true,
            product: {
                id: product._id,
                productName: product.productName,
                description: product.description,
                price: product.price,
                category: product.category,
                mainImage: product.mainImage,
                stock: product.stock,
                brandName: product.brandName,
                tax: product.tax,
                sellerInfo: decoded.id
            }
        })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json({
            message: "These are all products!",
            products: products
        })
    } catch (error) {
        return res.status(409).json({
            message: "Somwthing is wrong!",
            Error: error.message
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id).populate('sellerInfo', 'email adminName phone mainImage');
        if (!product) {
            return res.status(409).json({
                message: "Product is not available!"
            })
        }
        res.status(200).json({
            message: "Product fetched successfully!",
            product: product
        })
    } catch (error) {
        return res.status(404).json({
            message: "Something is wrong!",
            Error: error.message
        })
    }
}

const editProduct = async (req, res) => {
   try{
     const { id } = req.params;
   
    const update = req.body;

    if (req.file) {
        const result = await uploadFile(req.file.buffer);
        update.mainImage = result.url;
    }
    const updateProduct = await productModel.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true }
    )

    return res.status(200).json({
        message: "Product edited successfully!",
        updateProduct
    })
   }catch(err){
    return res.status(409).json({
        message: "Something is wrong!",
        Error: err.message
    })
   }
}

const deleteProduct = async (req, res) => {
  try{
      const { id } = req.params;
    if(id === -1){
        return res.status(404).json({
            message: "User not found"
        })
    }
    const product = await productModel.findById(id);
    if(!product){
        return res.status(409).json({
            message: "Product not found!"
        })
    }
    await productModel.findByIdAndDelete({id})
    
    res.status(200).json({
        message: "Product deleted successfully!"
    })
  }catch(err){
    return res.status(404).json({
        message: "Something is wrong",
        Error: err.message
    })
  }
}
module.exports = { createProduct, getAllProducts, getProduct, editProduct, deleteProduct }