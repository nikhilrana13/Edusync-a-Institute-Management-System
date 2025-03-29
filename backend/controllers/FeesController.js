import Fees from "../models/feesModel.js";
import Student from "../models/studentModel.js";
import Coursemodel from "../models/Course.js";

export const CollectFees = async (req, res) => {
  try {
    let { studentname, coursename, amount, remarks } = req.body;
    // console.log("body", req.body);


    const ownerid = req.user;

    //  check user exists or not



    // remove spaces from student name and case-sensitive ya space issu 
     const student = await Student.findOne({
      name: studentname.trim()
    });
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // check course exists or not
    const course = await Coursemodel.findOne({name:coursename });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newFees = await Fees.create({
      ownerid,
      studentname: student._id,
      coursename: course._id,
      amount,
      remarks,
    });

    await newFees.save();

    return res
      .status(200)
      .json({ message: "Fees collected successfully", newFees });
  } catch (error) {
    console.log("failed to collect fees", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const GetAllpaymenthistory = async (req, res) => {

  try {

    const ownerid = req.user;
    const paymenthistory = await Fees.find({ ownerid })
      .populate("studentname", "name")
      .populate("coursename", "name");

    if (!paymenthistory) {
      return res.status(404).json({ message: "No payment history found" });
    }

    return res
      .status(200)
      .json({ message: "Payment history found", paymenthistory });
  } catch (error) {
    console.log("failed to get payment history", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const EachStudentPaymentHistory = async (req, res) => {
  try {
    const studentid = req.params.id.trim();

    const paymenthistory = await Fees.find({ studentname: studentid })
      .populate("studentname", "name")
      .populate("coursename", "name");

    if (!paymenthistory) {
      return res.status(404).json({ message: "No payment history found" });
    }

    return res
      .status(200)
      .json({ message: "Payment history found", paymenthistory });
  } catch (error) {
    console.log("failed to get payment history", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const FeesTotalamount = async (req, res) => {
  try {
    const ownerid = req.user;
    const allfees = await Fees.find({ ownerid });

    // check if fees exists or not
    if (!allfees) {
      return res.status(404).json({ message: "No payment history found" });
    }

    // calculate total amount
    const totalamount = allfees.reduce((total, fees) => total + fees.amount, 0);
    // console.log("totalamount",totalamount);
    if (!totalamount) {
      return res.status(404).json({ message: "No payment history found" });
    }

    return res
      .status(200)
      .json({ message: "Payment amount found", totalamount });
  } catch (error) {
    console.log("failed to get payment history", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
