import express from "express";
import { AddCourse, GetOwnerAllCourses ,GetEachCourseDetail,UpdateCourse, DeleteCourse} from "../controllers/CourseController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import multer from "multer";


// multer configuration //

const storage = multer.memoryStorage();
const upload = multer({storage:storage})


const router = express.Router();

router.post("/addcourse",upload.single("image"),isAuthenticated,AddCourse);
router.get("/allcourses",isAuthenticated,GetOwnerAllCourses);
router.get("/details/:id",isAuthenticated,GetEachCourseDetail);
router.put("/updatecourse/:id",upload.single("image"),isAuthenticated,UpdateCourse);
router.delete("/deletecourse/:id",isAuthenticated,DeleteCourse);

export default router