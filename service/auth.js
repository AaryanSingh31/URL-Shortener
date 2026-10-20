// services/auth.js
const jwt = require('jsonwebtoken');
const secret = "Aaryan@123$"; // Secret key for JWT

// User data se JWT Token banane ke liye function
function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name,
        },
        secret
    );
}

// Cookie se mile token ko verify aur read karne ke liye function
function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null; // Invalid token aane par server crash se bachata hai
    }
}

module.exports = {
    setUser,
    getUser,
};