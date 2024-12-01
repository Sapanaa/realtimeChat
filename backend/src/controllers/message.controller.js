import message from "../models/message.model.js"
import user from "../models/user.model.js";



export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await user.find({ _id: { $ne: loggedInUserId } }),select("-password"); //find all user except the logged in user
        res.statud(200).json(filteredUsers)
    }
    catch(error){
        console.log(error)        
    }
}