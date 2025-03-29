import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { CollectFees, GetAllpaymenthistory, EachStudentPaymentHistory, FeesTotalamount } from "../controllers/FeesController.js";


const router = express.Router();

router.post("/collectfees",isAuthenticated,CollectFees);
router.get("/paymenthistory",isAuthenticated,GetAllpaymenthistory);
router.get("/paymenthistory/:id",isAuthenticated,EachStudentPaymentHistory);
router.get("/totalamount",isAuthenticated,FeesTotalamount);

export default router
