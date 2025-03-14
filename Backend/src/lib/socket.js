import { Server } from "socket.io";
import http from 'http'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:[process.env.CLIENT_ORIGIN]
    }
})

const userSocketMap = {};

io.on("connection",(socket)=>{
    console.log("User connected",socket.id);

    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId]=socket.id;
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    }
        
    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

export const getReceiverSocketId = (userId)=>{
    return userSocketMap[userId];
}

export {io,app,server};