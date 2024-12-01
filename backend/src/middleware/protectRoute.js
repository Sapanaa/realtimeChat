import jwt from "jsonwebtoken";
import user from "../models/user.model.js";


//function to validate the usder
export const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(400).json({ message: "Invalid token." });
        }
        const User = await user.findById(decoded.userId).select("-password");
        if(!User){
            return res.status(400).json({ message: "no user." });
        }
        req.user = User;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
}
