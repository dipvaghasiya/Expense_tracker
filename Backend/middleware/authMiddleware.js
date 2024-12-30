const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization ) 
        return res.status(401).json({message: "Unauthorized"})

    const token = authorization.split(" ")[1];
    if(!token)
        return res.status(401).json({message: "Unauthorized"})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized"})
    }
}

module.exports = auth;