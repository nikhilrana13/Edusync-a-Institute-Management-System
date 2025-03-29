import Coursemodel from "../models/Course.js";
import Student from "../models/studentModel.js";
import sharp from "sharp";
import cloudinary from "../utils/Cloudinary.js";


export const CreateStudent = async(req,res)=>{
    try {
        const {name,email,phone,address,coursename} = req.body;
        // console.log("body",req.body);
        // console.log("profilepic",req.file);
         const ownerid = req.user
         console.log("owner id",ownerid)
        //  console.log("req.user",req.user)

        // check if student exists or not 
        let existingstudent = await Student.findOne({email});

        if(existingstudent){
            return res.status(400).json({message:"Student already exists with this email"});
        }

        // check if profile pic is uploaded
        if(!req.file){
            return res.status(400).json({message:"Please upload profile picture"});
        }

        //  check if all fields are filled
        if(!name || !email || !phone || !address || !coursename || !req.file){
            return res.status(400).json({message:"All fields are required"})
        }
         
        // check if course exists or not
        const course = await Coursemodel.findOne({name:coursename,ownerId:ownerid});
        
        if(!course){
            return res.status(400).json({message:"Course does not exist "})
        }

        // optimize image and upload to cloudinary
           const OptimizedImageBuffer = await sharp(req.file.buffer)
                .resize({width:200,height:200,fit:"inside"})
                .toFormat("jpeg",{quality:80})
                .toBuffer();
                 
                const fileUrl = `data:image/jpeg;base64,${OptimizedImageBuffer.toString("base64")}`;
        
                const cloudResponse = await cloudinary.uploader.upload(fileUrl);
                const imageUrl = cloudResponse.secure_url;

              const student = await Student.create({name,email,phone,address,coursename:course._id,imageUrl,profilePicture:imageUrl,ownerid:ownerid});

              await student.save();

              course.students.push(student._id);
              await course.save();

              return res.status(200).json({message:"Student created successfully",student});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const GetAllStudents = async(req,res)=>{
    try {
          const ownerid = req.user
        //   console.log("ownerid",ownerid);

        const students = await Student.find({ownerid}).populate("coursename","name");

        if(!students){
            return res.status(400).json({message:"No students found"})
        }

        return res.status(200).json({message:"Students found",students});
        
    } catch (error) {
        console.log("failed to get all students",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const EachStudentDetail = async(req,res)=>{
    try { 

         const studentid = req.params.id.trim();

        // find student that belongs to the logged-in user
        const student = await Student.find({
            _id:studentid,
            ownerid:req.user
        })


         if(!student){
            return res.status(400).json({message:"Student not found"})
         }
         
         return res.status(200).json({message:"Student found",student});
    } catch (error) {
        console.log("failed to get student details",error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}

export const updateStudentDetails = async(req,res)=>{
    try {
        const studentid = req.params.id.trim();

        const {name,email,phone,address} = req.body;
        console.log("body",req.body);

        // check if student exists or not
        const student = await Student.findById(studentid);

        if(!student){
            return res.status(400).json({message:"Student not found"})
        }

        if(email && email !== student.email){
            const existingstudent = await Student.findOne({email});
            if(existingstudent && existingstudent._id.toString() !== studentid){
                return res.status(400).json({message:"Student already exists with this email"});
            }
        }

        let imageUrl = student.profilePicture;   // if no new image is uploaded then keep the old image

        // if new image is uploaded then optimize and upload to cloudinary
        if(req.file){
            const OptimizedImageBuffer = await sharp(req.file.buffer)
            .resize({width:200,height:200,fit:"inside"})
            .toFormat("jpeg",{quality:80})
            .toBuffer();
            const fileUrl = `data:image/jpeg;base64,${OptimizedImageBuffer.toString("base64")}`;
            const cloudResponse = await cloudinary.uploader.upload(fileUrl);
            imageUrl = cloudResponse.secure_url;
        }

        const updatedstudent = await Student.findByIdAndUpdate(studentid,{
            name,
            email,
            phone,
            address,
            profilePicture:imageUrl
            
        },{new:true,runValidators:true});

        return res.status(200).json({message:"Student updated successfully",updatedstudent});
        
    } catch (error) {
        console.log("failed to update student details",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const deleteStudent = async(req,res)=>{
    try {
        const studentid = req.params.id.trim();

        if(!studentid){
            return res.status(400).json({message:"Student id is not provided"})
        }
        const student = await Student.findByIdAndDelete(studentid);

        if(!student){
            return res.status(400).json({message:"Student not found"})
        }
        
        // delete student from course
        await Coursemodel.updateMany({students:studentid},{$pull:{students:studentid}});
        return res.status(200).json({message:"Student deleted successfully"});


        
    } catch (error) {
        console.log("failed to delete student",error);
        return res.status(500).json({message:"Internal server error"})
    }
}




