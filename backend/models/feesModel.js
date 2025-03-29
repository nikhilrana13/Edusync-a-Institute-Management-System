import mongoose from "mongoose";


const feesSchema = mongoose.Schema({
      ownerid:{type:mongoose.Schema.Types.ObjectId,ref:"Owner",required:true},
      studentname :{type:mongoose.Schema.Types.ObjectId,ref:"Student",required:true},
      coursename:{type:mongoose.Schema.Types.ObjectId,ref:"Course",required:true},
      amount:{type:Number,required:true},
      remarks:{type:String,required:true},
      date:{type:Date,default:Date.now},

})

const Fees = mongoose.model("Fees",feesSchema);
export default Fees


