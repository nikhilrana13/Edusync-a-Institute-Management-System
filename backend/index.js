import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import CourseRoute from "./routes/CourseRoute.js";
import StudentRoute from "./routes/StudentRoute.js";
import FeesRoute from "./routes/feeRoute.js";
import { removespaces } from "./middleware/removespaces.js";


dotenv.config()
const app = express();

const PORT = process.env.PORT || 5000;

// middlewares //
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true   
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// for removing spaces from url
app.use(removespaces);



// routes //
app.use("/user",UserRoute);
app.use("/course",CourseRoute);
app.use("/student",StudentRoute);
app.use("/fees",FeesRoute);


// app.use((req,res,next)=>{
//     console.log("Incoming request",req.method,req.url);
//     next();
// })


// connet to db
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB",err);
})




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

