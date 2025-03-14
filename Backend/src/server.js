import express from 'express'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'
import { connectDb } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { app, server } from './lib/socket.js';

app.use(express.json({limit:'50mb'})); //to get req.body data (JSON to JS object)
app.use(cookieParser());
app.use(cors({
  origin:process.env.CLIENT_ORIGIN,
  credentials:true
}));
dotenv.config();
const port = process.env.PORT;

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectDb();
})