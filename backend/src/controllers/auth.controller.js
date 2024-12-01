import { generateToken } from "../lib/utils.js"
import user from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import cloudinary from "../lib/cloudinary.js"

export const login = async(req, res) => {
    const { email, password } = req.body

    try{
        const User = await user.findOne({ email })
        if(!User){
            return res.status(404).json({ message: "User not found" })
        }
        //match the passsowrd with bcrypt and create cookie
        const isMatch = await bcrypt.compare(password, User.password)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid password" })
        }
        
        generateToken(User._id, res)
        res.status(200).json({ message: "User logged in successfully", user: User })

    }
    catch(error){
        console.log(error)
    }

}

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validate inputs
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 4) {
            return res.status(400).json({ message: "Password must be at least 4 characters" });
        }

        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new user({ username, email, password: hashedPassword });
        await newUser.save();


        //generate cookie and hash the password with bcrypt
        if(newUser){
            generateToken(newUser._id, res)
        }

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




export const logout = async (req, res) => {   
    try{
        //delete the cookie and send the response
        res.cookie("jwt", "", { httpOnly: true, sameSite: "strict", maxAge: 0 });
        res.status(200).json({ message: "User logged out successfully" })
    }
    catch(error){
        console.log(error)
    }

}


export const updateProfile = async (req, res) => {
    try {
        const { profilePic, username, email } = req.body;
        const User = await user.findById(req.user._id);

        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }

       

        // Upload the profile picture to Cloudinary
        const uploadResult = await cloudinary.uploader
       .upload(
           profilePic,
       )
       .catch((error) => {
           console.log(error);
       });

     
        // Update user with new profile information
        const updatedUser = await user.findByIdAndUpdate(
            req.user._id,
            {
                profilePic: uploadResult.secure_url,
                username,
                email,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not updated" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth =  (req, res) => {
    try {

        res.status(200).json({ message: "User logged in successfully", user: req.user })

    }
    catch (error) {
        console.log(error)
    }
}