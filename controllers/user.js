const User = require('../models/user'); // User MongoDB model ko import kiya
const { setUser } = require('../service/auth'); // JWT token banane wala function import kiya

// SIGNUP FUNCTION: Naye user ko register karta hai
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body; // Form se aayi name, email, password fields nikali

    const existingUser = await User.findOne({ email }); // Database me check kiya ki email pehle se DB me hai ya nahi
    if (existingUser) return res.render("signup", { error: "User already exists" }); // Agar email mil gayi toh error ke sath signup page dikhao

    const user = await User.create({ name, email, password }); // Naya user document MongoDB me create kiya
    
    const token = setUser(user); // Naye user ki details ka JWT token banaya
    res.cookie("token", token); // Generated token ko browser ki cookie me save kiya

    return res.redirect("/"); // Token set hote hi homepage par redirect kar diya
}

// LOGIN FUNCTION: Purane user ko verify karta hai
async function handleUserLogin(req, res) {
    const { email, password } = req.body; // Login form se email aur password nikala
    const user = await User.findOne({ email, password }); // Matching email aur password wala user DB me dhoonda

    if (!user) return res.render("login", { error: "Invalid Email or Password" }); // User na milne par error ke sath login page dikhao

    const token = setUser(user); // User milte hi uske liye naya JWT token banaya
    res.cookie("token", token); // Token ko browser cookie me save kiya

    return res.redirect("/"); // Authenticate karke homepage par redirect kar diya
}

// Dono functions ko export kiya taaki routes file me attach kar sakein
module.exports = {
    handleUserSignup,
    handleUserLogin,
};