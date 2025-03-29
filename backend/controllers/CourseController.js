
import Owner from "../models/OwnerModal.js"
import Coursemodel from "../models/Course.js";
import sharp from "sharp";
import cloudinary from "../utils/Cloudinary.js";
import Student from "../models/studentModel.js";




// add course function

export const AddCourse = async(req,res)=>{
    try {

        let {ownerId,name,description,price,duration} = req.body;
        console.log("body",req.body);
        console.log("file",req.file);
        ownerId = req.user
        // console.log("ownerId",ownerId);

        // check if user exists or not 
        const User = await Owner.findOne({_id:ownerId})

        if(!User){
            return res.status(401).json({message:"user not found please login"});
        }
       

         // check if all fields are filled or not
         if(!ownerId || !name || !description || !price || !req.file || !duration){
            return res.status(400).json({message:"All fields are required"});
        }
          
        // check if image is uploaded or not 

        if(!req.file){
            return res.status(400).json({message:"Please upload an image"});
        }

        //  optimize image and upload to cloudinary 

        const OptimizedImageBuffer = await sharp(req.file.buffer)
        .resize({width:400,height:400,fit:"inside"})
        .toFormat("jpeg",{quality:80})
        .toBuffer();
         
        const fileUrl = `data:image/jpeg;base64,${OptimizedImageBuffer.toString("base64")}`;

        const cloudResponse = await cloudinary.uploader.upload(fileUrl);
        const imageUrl = cloudResponse.secure_url;

         const Course = await Coursemodel.create({
            ownerId,
            name,
            description,
            price,
            image:imageUrl,
            duration

         })
          
        await Course.save();

        return res.status(200).json({message:"Course created successfully",Course});
    
    } catch (error) {
        console.log("failed to create course",error);
        return res.status(500).json({message:"internal server error"});
    }
}


// get all courses function 
export const GetOwnerAllCourses = async(req,res)=>{
    try {
         const Courses = await Coursemodel.find({ownerId:req.user});

        //  check if course exists or not 
         if(!Courses){
            return res.status(404).json({message:"No courses found"});
         }

        return res.status(200).json({message:"Courses found",Courses});
        
    } catch (error) {
        console.log("failed to get all courses",error);
        return res.status(500).json({message:"internal server error"});
    }
}


// get each course details function
export const GetEachCourseDetail = async(req,res)=>{
    try {
        const CourseId = req.params.id.trim();
        // console.log("id",CourseId);
         
        const Course = await Coursemodel.findById(CourseId).populate("students","name email phone profilePicture");

        if(!Course){
            return res.status(404).json({message:"Course not found"});
        }

        return res.status(200).json({message:"Course found",Course});
        
    } catch (error) {
        console.log("failed to get course detail",error);
        return res.status(500).json({message:"internal server error"}); 
    }
}


export const UpdateCourse = async(req,res)=>{
     try {
        const CourseId = req.params.id.trim();
        let {name,description,price,duration} = req.body;
        
        
        // check if course exists or not

         const Course = await Coursemodel.findById(CourseId);

         if(!Course){
            return res.status(404).json({message:"Course not found"});
         }

         let imageUrl = Course.image;  // if no new image is uploaded then keep the old image

        // if new image is uploaded then optimize and upload to cloudinary
    
         if(req.file){
             const OptimizedImageBuffer = await sharp(req.file.buffer)
             .resize({width:400,height:400,fit:"inside"})
             .toFormat("jpeg",{quality:80})
             .toBuffer();

                  
         const fileUrl = `data:image/jpeg;base64,${OptimizedImageBuffer.toString("base64")}`;

        const cloudResponse = await cloudinary.uploader.upload(fileUrl);
         imageUrl = cloudResponse.secure_url;
         }
        
        //  update course
        const updatedCourse = await Coursemodel.findByIdAndUpdate(CourseId,{name,description,price,duration,image:imageUrl},{new:true});

        return res.status(200).json({message:"Course updated successfully",updatedCourse});
        
     } catch (error) {
        console.log("failed to update course",error);
        return res.status(500).json({message:"internal server error"});
        
     }
}

export const DeleteCourse = async(req,res)=>{
    try {
        const CourseId = req.params.id.trim();
        console.log("id",CourseId);

        const Course = await Coursemodel.findById(CourseId);

        if(!Course){
            return res.status(404).json({message:"Course not found"});
        }

        if (Course.image) {
            const parts = Course.image.split("/");
            const uploadIndex = parts.findIndex(part => part === "upload");
            if (uploadIndex !== -1) {
                const publicId = parts.slice(uploadIndex + 1).join("/").split(".")[0];
                console.log("Final Public ID:", publicId);

                const cloudResponse = await cloudinary.uploader.destroy(publicId);
                console.log("Cloudinary Response:", cloudResponse);
            }
        }

        
       
        // delete all student enrolled in the course

        await Student.updateMany({coursename:CourseId},{coursename:null});

        await Coursemodel.findByIdAndDelete(CourseId);

        return res.status(200).json({message:"Course deleted successfully"});
        
    } catch (error) {
        console.log("failed to delete course",error);
        return res.status(500).json({message:"internal server error"});  
    }
}


