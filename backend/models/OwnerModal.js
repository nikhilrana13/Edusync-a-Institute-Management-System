import mongoose from "mongoose";


const ownerSchema = mongoose.Schema({
    insitiutename: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
})


const Owner = mongoose.model("Owner",ownerSchema);
export default Owner



