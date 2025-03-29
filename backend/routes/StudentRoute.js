import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { CreateStudent, GetAllStudents, EachStudentDetail,updateStudentDetails,deleteStudent } from "../controllers/StudentController.js";
import multer from "multer";

const router = express.Router();

// multer configuration //
const storage = multer.memoryStorage();
const upload = multer({storage:storage})


router.post("/addstudent",upload.single("profilePicture"),isAuthenticated,CreateStudent);
router.get("/studentdetails/:id",isAuthenticated,EachStudentDetail);
router.put("/updatestudent/:id",upload.single("profilePicture"),isAuthenticated,updateStudentDetails);
router.delete("/deletestudent/:id",isAuthenticated,deleteStudent);




router.get("/allstudents",isAuthenticated,GetAllStudents);



export default router