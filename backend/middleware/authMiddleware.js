const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };