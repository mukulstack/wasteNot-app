// // verify token middleware
// // authMiddleware.js

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//     try {
        
//         let token = req.headers.authorization;

//         if (token && token.startsWith("Bearer")) {
//             token = token.split(" ")[1]; // extracting token

//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select("-password");
//             next();
//         } else {
//             res.status(401).json({ message: "Unauthorized, No token" });
//         }

//     } catch (error) {
//         res.status(401).json({ message: "Token failed", error: error.message});
//     }
// };

// // middle ware for admin-only
// const adminOnly = (req, res, next) => {
//     if (req.user && req.user.role === "admin") {
//         next();
//     } else {
//         res.status(403).json({ message: "Access denied, admin only"});
//     }
// };

// module.exports = {
//     protect,
//     adminOnly
// }


// verify token middleware
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        let token;

        // 1. Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // 2. If not in header, check cookies
        if (!token && req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        }

        // 3. If no token found at all
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, No token" });
        }

        // 4. Verify and attach user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        next();
    } catch (error) {
        res.status(401).json({ message: "Token failed", error: error.message });
    }
};

// middleware for admin-only
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, admin only" });
    }
};

module.exports = {
    protect,
    adminOnly,
};
