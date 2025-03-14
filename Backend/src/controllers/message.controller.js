import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js"

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({ _id: { $ne: req.body.user._id } }).select("-password");
        return res.status(200).json({ message: "Contacts fetched", contacts: users })
    }
    catch (e) {
        return res.status(500).json({ message: "Server error." })
    }
}

export const getChatById = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const myId = req.body.user._id;
        const messages = await messageModel.find({
            $or: [
                { senderId: myId, receiverId },
                { senderId: receiverId, receiverId: myId }
            ]
        })
        return res.status(200).json({ message: "Messages Fetched.", messages })
    }
    catch (e) {
        return res.status(500).json({ message: "Server error." });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        if (!text && !image) return res.status(400).json({ message: "Input invalid." });
        const { id: receiverId } = req.params;
        const userId = req.body.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = await messageModel.create({ senderId: userId, receiverId, image: imageUrl, text });
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        return res.status(201).json({message: "Message Sent.",newMessage});
    }
    catch (e) {
        console.log(e.message)
        return res.status(500).json({message:"Server error."})
    }
}