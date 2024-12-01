import message from "../models/message.model.js"
import user from "../models/user.model.js";

import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await user.find({ _id: { $ne: loggedInUserId } }).select("-password"); //find all user except the logged in user
        res.statud(200).json(filteredUsers)
    }
    catch(error){
        console.log(error)        
    }
}
export const getMessages = async (req, res) => {
    try{
        const { id:userToChatId } = req.params;
        const myID = req.user._id;

        const messages = await message.find(
            {
                $or: [
                    { senderid: myID, receiverId: userToChatId },
                    { senderid: userToChatId, receiverId: myID }
                ]
            }
        );
        res.status(200).json(messages)
    }
    catch(error){
        console.log(error)        

    }

}   

export const sendMessage = async (req, res) => {
    try{
        const { id:userToChatId } = req.params;
        const myID = req.user._id;
        const { text, image } = req.body;

        let imageUrl;
        if(image){
            const uploadResult = await cloudinary.uploader
            .upload(image)
            .catch((error) => {
                console.log(error);
            });
            imageUrl = uploadResult.secure_url
        } 
        const newMessage = new message({ senderid: myID, receiverId: userToChatId, text, image : imageUrl});        
        await newMessage.save();

        //realtime functionality with socket.io
        res.status(200).json(newMessage)
    }       
    catch(error){
        console.log(error)        
    }
}