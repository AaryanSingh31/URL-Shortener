const { getUser } = require("../service/auth");

// 1. Soft Check: Safe route requests par token verification karta hai
function checkAuth(req, res, next) {
    const tokenCookie = req.cookies?.token; // Cookie name 'token' match karo

    if (!tokenCookie) {
        req.user = null;
        return next();
    }

    // JWT verify karke user object nikalo (agar invalid hua toh null milega)
    const user = getUser(tokenCookie);
    req.user = user;
    return next();
}

// 2. Strict Protection: Unauthenticated users ko /login par redirect karta hai
function restrictAuth(req, res, next) {
    const tokenCookie = req.cookies?.token;

    // Cookie missing hai -> redirect to login
    if (!tokenCookie) {
        return res.redirect("/login");
    }

    // Token invalid ya expired hai -> redirect to login
    const user = getUser(tokenCookie);
    if (!user) {
        return res.redirect("/login");
    }

    req.user = user; // Current user req.user me attach ho gaya
    return next();
}

module.exports = {
    checkAuth,
    restrictAuth,
};