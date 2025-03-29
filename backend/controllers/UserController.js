import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Owner from "../models/OwnerModal.js";
import dotenv from "dotenv";

dotenv.config();


export const SignUp = async(req,res)=>{
    try {
        const {insitiutename,email,password} = req.body;
        console.log("req body",req.body);

        // check if user already exists

        const existingUser = await Owner.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }


        const hash = await bcrypt.hash(password,10);

        const User = await Owner.create({
            insitiutename,
             email,
             password:hash,
        })

        return res.status(200).json({message:"Signup successful",User});
    } catch (error) {
        console.log("failed to signup",error);
        return res.status(500).json({message:"internal server error"});
    }
}

export const Login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        // check if user exists or not 

        const existingUser = await Owner.findOne({email});

        if(!existingUser){
            return res.status(400).json({message:"User not found please signup"});
        }

        // check if password is correct or not

        const isMatch = await bcrypt.compare(password,existingUser.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid password or email"});
        }

        // create jwt token 
        const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax"});
        return res.status(200).json({message:"Login successful",existingUser,token});
        
    } catch (error) {
        console.log("failed to login",error);
        return res.status(500).json({message:"internal server error"});
    }
}

export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true,secure:false,sameSite:"lax"});
        return res.status(200).json({message:"Logout successful"});
        
    } catch (error) {
        console.log("failed to logout",error);
        return res.status(500).json({message:"internal server error"});
    }
}