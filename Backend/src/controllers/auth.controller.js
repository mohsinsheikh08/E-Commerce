const userModel = require('../models/user.model.js');
const adminModel = require('../models/admin.model.js');
const productModel = require('../models/product.model.js')
const orderModel = require('../models/order.model.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uploadFile = require('../service/product.service.js');


const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

const userRegister = async (req, res) => {
    try {
        const { fullName: { firstName, lastName }, email, password, role } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const isEmailAlreadyExist = await userModel.findOne({ email });
        if (isEmailAlreadyExist) {
            return res.status(409).json({ message: "User already exist!" });
        }
        const user = await userModel.create({
            fullName: { firstName, lastName },
            email,
            password: hashPassword,
            role: role || 'User'
        });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY);
        res.cookie('token', token, cookieOptions);

        res.status(201).json({
            message: "User registered successfully!",
            user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
        });
    } catch (err) {
        console.log(err.message);
        res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "User is not available!" });
        }
        const decoded = await bcrypt.compare(password, user.password);
        if (!decoded) {
            return res.status(409).json({ message: "Invalid credentials!" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY);
        res.cookie('token', token, cookieOptions);

        res.status(201).json({
            message: "User login successfully!",
            user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

const userLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "User logged out successfully!" });
    } catch (err) {
        return res.status(409).json({ message: "User is not logout. Try again later!", Error: err.message });
    }
};

const adminRegister = async (req, res) => {
    try {
        const { businessName, businessType, adminName, email, password, phone, street, city, state, zipCode, country, role } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const isEmailAlreadyExist = await adminModel.findOne({ email });
        if (isEmailAlreadyExist) {
            return res.status(409).json({ message: "Admin already exist!" });
        }
        const result = await uploadFile(req.file.buffer);
        const admin = await adminModel.create({
            businessName,
            businessType,
            adminName,
            email,
            password: hashPassword,
            phone,
            adminImage: result.url,
            address: { street, city, state, zipCode, country },
            role
        });
        const token = jwt.sign({ id: admin._id, role: "Admin" }, process.env.JWT_KEY);
        res.cookie('token', token, cookieOptions);

        return res.status(201).json({
            message: "Admin registered successfully!",
            AdminDetails: {
                businessName: admin.businessName,
                businessType: admin.businessType,
                adminName: admin.adminName,
                phone: admin.phone,
                adminImage: admin.adminImage,
                address: admin.address
            },
            role
        });
    } catch (err) {
        return res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email }).select("+password");
        if (!admin) {
            return res.status(409).json({ message: "Admin not found!" });
        }
        const decoded = await bcrypt.compare(password, admin.password);
        if (!decoded) {
            return res.status(409).json({ message: "Invalid credentials!" });
        }
        const token = jwt.sign({ id: admin._id, role: "Admin" }, process.env.JWT_KEY);
        res.cookie('token', token, cookieOptions);

        res.status(201).json({
            message: "Admin login successfully!",
            admin: { id: admin._id, adminName: admin.adminName, email: admin.email, role: admin.role }
        });
    } catch (err) {
        return res.status(409).json({ message: "Something is wrong", Error: err.message });
    }
};

const adminLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: "Admin Logout successfully!" });
    } catch (err) {
        return res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

const AdminInfo = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const admin = await adminModel.findById(decoded.id);
        res.status(200).json({ message: "Admin info fetched successfully!", admin });
    } catch (err) {
        return res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

const getStats = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.role !== "Admin") {
            return res.status(403).json({ message: "Admin access required!" });
        }
        const adminId = decoded.id;

        const totalProducts = await productModel.countDocuments();
        const totalAdmin = await adminModel.countDocuments();
        const totalOrder = await orderModel.countDocuments();
        const totalUsers = await userModel.countDocuments();

        const revenue = await orderModel.aggregate([
            { $match: { status: 'delivered' } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);
        const totalRevenue = revenue[0]?.total || 0;

        res.status(200).json({
            message: "All Info are fetched!",
            stats: { totalProducts, totalAdmin, totalUsers, totalOrder, totalRevenue }
        });
    } catch (err) {
        return res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.role !== "Admin") {
            return res.status(403).json({ message: "Admin access required!" });
        }
        const userId = decoded.id;
        const admin = await adminModel.findById(userId);
        if (admin.role !== "super_admin" && admin.role !== "order_manager") {
            return res.status(403).json({ message: "Access denied! Only order_manager and super_admin can view orders." });
        }

        const totalOrders = await orderModel.countDocuments();
        const order = await orderModel.find()
            .populate('user', 'fullName email')
            .populate('items.product', 'productName price mainImage')
            .sort({ createdAt: -1 });

        res.status(200).json({ message: "Orders fetched successfully!", totalOrders, order });
    } catch (err) {
        return res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.role !== "Admin") {
            return res.status(403).json({ message: "Admin access required!" });
        }
        const userId = decoded.id;
        const admin = await adminModel.findById(userId).select('-password');
        if (admin.role !== "super_admin" && admin.role !== "product_admin") {
            return res.status(403).json({ message: "Access denied! Only product_admin and super_admin can view products." });
        }

        const products = await productModel.find().populate('sellerInfo', 'adminName email');
        res.status(200).json({ message: "Products fetched successfully!", products });
    } catch (err) {
        return res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.role !== "Admin") {
            return res.status(403).json({ message: "Admin access required!" });
        }
        const userId = decoded.id;
        const admin = await adminModel.findById(userId).select('-password');
        if (admin.role !== "super_admin" && admin.role !== "user_manager") {
            return res.status(403).json({ message: "Access denied! Only user_manager and super_admin can view users." });
        }

        const users = await userModel.find();
        res.status(200).json({ message: "Users fetched successfully!", users });
    } catch (err) {
        return res.status(409).json({ message: "Something is wrong!", Error: err.message });
    }
};

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    adminRegister,
    adminLogin,
    adminLogout,
    AdminInfo,
    getStats,
    getAllOrders,
    getAllProducts,
    getAllUsers
};