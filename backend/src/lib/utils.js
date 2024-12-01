import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("jwt", token, { httpOnly: true, sameSite: "strict", maxAge: 3600000 , secure: process.env.NODE_ENV === "production" ? true : false  });
    

}