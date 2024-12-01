import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderid: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})  

const message = mongoose.model("Message", messageSchema)

export default message