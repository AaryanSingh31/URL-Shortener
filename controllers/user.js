
//controller for handling user related req like login, logout, signup etc

const User = require('../models/user'); //importing the mongoose model for user

const { setUser, getUser } = require('../services/auth'); //importing the auth service to manage user sessions
const crypto = require('crypto'); //importing crypto module for hashing passwords

//Function to handle user signup
async function handleUserSignup(req, res){
    const { name, email, password } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email });

    if(existingUser){
        return res.status(400).json({
            message : "User already exists"
        })
    }
    //hash the password before saving
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex'); //what is sha256? sha256 is a cryptographic hash function that takes an input and produces a fixed-size string of characters, which is typically a hexadecimal number. It is widely used for data integrity and security purposes, such as password hashing.

    //create a new user in the database
    const newUser = await User.create({
        name,
        email,
        password : hashedPassword
    });
    return res.redirect('/login'); //redirect to login page after successful signup

    //FUNCTION TO HANDLE USER LOGIN

    async function handleUserLogin(req, res){
        const {email, password} = req.body; //destructuring the email and password from the request body

        //find the user in the database
        const userFind = await User.findOne({email});

        if(!userFind){
            return res.render('login', { error: 'Invalid email or password' }); //if user not found, render the login page with an error message
        }

        //user mil gaya ab random session id generate karenge aur usko user ke sath map karenge
        const sessionId = crypto.randomBytes(16).toString('hex'); //generate a random session id

        setUser(sessionId, userFind); //map the session id to the user object. Isse kya hoga ki jab bhi user koi request karega, hum session id ke through usko identify kar sakenge aur uske data ko access kar sakenge.

        //set the session id in the cookie
        res.cookie('sessionId', sessionId, { httpOnly : true }); 

        return res.redirect('/'); //redirect to home page after successful login
    }

}

module.exports = {
    handleUserSignup, 
    handleUserLogin
};
