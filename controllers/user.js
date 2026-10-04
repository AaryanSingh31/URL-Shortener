const User = require('../models/user'); 
const { setUser, getUser } = require('../service/auth'); 
const crypto = require('crypto'); 

// 1. SIGNUP WALA FUNCTION
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render("signup", { error: "User already exists" });
    }

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/"); 
}

// 2. LOGIN WALA FUNCTION
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email, password });
    
    if (!user) {
        return res.render("login", {
            error: "Invalid Username or Password",
        });
    }
    
    const sessionId = crypto.randomUUID();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    
    return res.redirect("/"); 
}

// 3. EXPORT KARNA (Taaki routes use kar sakein)
module.exports = {
    handleUserSignup,
    handleUserLogin,
};