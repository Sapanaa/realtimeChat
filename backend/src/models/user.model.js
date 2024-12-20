import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true
    },
     profilePic: {
        type: String,
        default: ""
    }},
    {
        timestamps: true
    }    
)

const user = mongoose.model("User", userSchema)

export default user