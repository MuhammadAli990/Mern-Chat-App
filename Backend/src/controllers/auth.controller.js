import cloudinary from "../lib/cloudinary.js";
import { generate_jwt_token } from "../lib/utils.js";
import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const signup = async(req, res) => {
    try {
        const { email, fullname, profilePic, password } = req.body;
        if (!email || !fullname || !password) {
            return res.status(400).json({ message: "All input fields are required" });
        }
        else if (password.length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 characters long." })
        }
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email is already registered." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await userModel.create({ email, fullname, profilePic:profilePic?profilePic:undefined, password:hashedPassword });
        if(newUser){
            generate_jwt_token(newUser._id,res);
            delete newUser.password;
            return res.status(201).json({message:"Signed up successfully.",user:newUser})
        }
        else{
            return res.status(400).json({message:"Invalid user data."})
        }
    }
    catch (e) {
        return res.status(500).json({message:"Server error."})
    }

}

export const signin = async(req, res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "All input fields are required" });
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"Wrong credentials."});
        }
        const isPassCorrect = await bcrypt.compare(password,user.password);
        if(!isPassCorrect){
            return res.status(400).json({message:"Wrong credentials."});
        }
        generate_jwt_token(user._id,res);
        delete user.password;
        return res.status(200).json({message:"Logged in successfully.",user})
    }
    catch(e){
        return res.status(500).json({message:"Server error."})
    }
}

export const signout = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({message:"Logged out successfully."})
    }
    catch(e){
        return res.status(500).json({message:"Server error."})
    }
}

export const updateProfilePic = async(req,res)=>{
    try{
        const {profilePic} = req.body;
        if(!profilePic){
            return res.status(400).json({message:"Profile image is required."})
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const user = await userModel.findByIdAndUpdate(req.body.user._id,{profilePic:uploadResponse.secure_url},{new:true}).select("-password");
        return res.status(200).json({message:"User profile image updated.",user});
    }
    catch(e){
        return res.status(500).json({message:"Server error."})
    }
}

export const checkAuth = (req,res)=>{
    try{
        return res.status(200).json({message:"Authenticated",user:req.body.user});
    }
    catch(e){
        return res.status(500).json({message:"Server error."})
    }
}