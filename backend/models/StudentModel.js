import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
      ownerid:{type:mongoose.Schema.Types.ObjectId,ref:"Owner",required:true},
      name:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      phone:{type:String,required:true},
      address:{type:String,required:true},
      coursename:{type:mongoose.Schema.Types.ObjectId,ref:"Course",required:true},
      profilePicture:{type:String,required:true,default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"},
})


const Student = mongoose.model("Student",studentSchema);
export default Student


