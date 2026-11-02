const express = require('express'); // Express framework import kiya
const path = require('path'); // File aur folder paths set karne wala built-in module
const cookieParser = require('cookie-parser'); // Browser cookies parse karne wala package
const { connectToMongoDB } = require('./connection'); // Database connection function import kiya

const staticRoute = require('./routes/staticRouter'); // Home, Login, Signup EJS pages ke routes
const userRoute = require('./routes/user'); // Login/Signup API POST requests ke routes
const urlRoute = require('./routes/url'); // Short URL generate karne ke routes
const { checkAuth, restrictAuth } = require('./middlewares/auth'); // Auth checking and route protecting middlewares

const app = express(); // Express app ka instance banaya
const PORT = 8000; // Server chalane ke liye port number assign kiya

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log("MongoDB connected")); // DB se connect kiya
app.set('view engine', 'ejs'); // Template engine EJS set kiya
app.set('views', path.join(__dirname, 'views')); // Views folder ka exact path configuration

app.use(express.json()); // Income JSON requests ko handle karne ke liye middleware
app.use(express.urlencoded({ extended: false })); // Form Submit (POST) ke body data ko parse karne ke liye
app.use(cookieParser()); // Request headers se cookies ko req.cookies me convert karne ke liye
app.use(checkAuth); // Har request par cookie token decode karke req.user me set karne ke liye

app.use('/user', userRoute); // Public routes (Signup aur Login actions ke liye)
app.use('/url', restrictAuth, urlRoute); // URL generation (Only logged-in users ke liye restricted)
app.use('/', restrictAuth, staticRoute); // Main Dashboard render (Only logged-in users ke liye restricted)

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`)); // Server ko port 4001 par listen karne lagaya