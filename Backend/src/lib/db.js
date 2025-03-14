import mongoose from 'mongoose'

export const connectDb = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected successfully: " + conn.connection.host);
    }catch(e){
        console.log("Error connecting mongo DB. "+ e.message);
    }
}