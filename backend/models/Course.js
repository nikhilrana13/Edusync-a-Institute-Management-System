import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    ownerId:{type:mongoose.Schema.Types.ObjectId,ref:"Owner",required:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    image:{type:String,required:true},
    duration:{type:String,required:true},
    students:[{type:mongoose.Schema.Types.ObjectId,ref:"Student"}]
})

const Coursemodel = mongoose.model("Course",courseSchema);
export default Coursemodel