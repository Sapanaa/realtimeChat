import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
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