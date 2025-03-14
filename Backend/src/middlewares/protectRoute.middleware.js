import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js';


const protectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Log-in to access this route."});
        }
        const decodedJwt = jwt.verify(token,process.env.JWT_SECRET);
        if(!decodedJwt){
            return res.status(401).json({message:"Log-in to access this route."});
        }
        const user = await userModel.findById(decodedJwt.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found."});
        }
        req.body.user = user;
        next();
    }
    catch(e){
        return res.status(500).json({message:"Server error."})
    }
}
export default protectRoute;