require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/db/db.js')
connectDB()
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server (PORT : ${port}) is running successfully!`)
})