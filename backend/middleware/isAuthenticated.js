import jwt from "jsonwebtoken";

export const isAuthenticated =(req,res,next)=>{
    try {
        const token = req.cookies.token
        // console.log("cookies",req.cookies);
        // console.log("token",token);

        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // console.log("decoded",decoded);
        req.user = decoded.id;
        // console.log("decoded id ",req.user);

        next();
        
    } catch (error) {
        return res.status(500).json({message:"failed to authenticate"});
    }
}

