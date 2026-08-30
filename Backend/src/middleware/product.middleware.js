const jwt = require('jsonwebtoken')
const tokenChecker = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Invalid credintials!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if (decoded.role === "User") {
            return res.status(409).json({
                message: "This page are not accessible for user!"
            })
        }
        next()
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong",
            Error: err.message
        })
    }
}

module.exports = { tokenChecker }
