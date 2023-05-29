const {Register}  = require ('../model/auth-model')
const transporter = require("../helpers/mail.config");


const getAllUser = async (req, res, next) => {
    try {
        const userData = await Register.find({});
        res.status(200).json({
            error: false,
            message: "all user list",
            userData
        })
    } catch (err) {
        next(err)
    }
}



const getUserById =  async (req,res,next)=>{
    try {
        let user = await Register.findOne({_id:req.params.id})
        res.status(200).json({error:false,message:'User fetched successfully',response:user})
    } catch (error) {
        next(err)
    }
}

const getUserByEmail =  async (req,res,next)=>{
    try {
        let user = await Register.findOne({email:req.params.email})
        res.status(200).json({
            error:false,
            message:'User fetched successfully based on Email',
            response:user})
    } catch (error) {
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const{
            fullName,
            email,
            employeeId,
            designation,
            phoneNumber,
            department,
            gender,
            benchHiring,
            marketHiring,
            resourcePool,
            managementSystem,
            pssystem,
            clientOnBoard
        }=req.body;

        const updateUserdata = await Register.findOneAndUpdate({
            _id: req.params.id
        }, {
            fullName,
            email,
            employeeId,
            designation,
            phoneNumber,
            department,
            gender,
            benchHiring,
            marketHiring,
            resourcePool,
            managementSystem,
            pssystem,
            clientOnBoard
        }, {
            new: true
        });
       if(updateUserdata){
        const notificationArray = []  
        const finalArray = []                                                                                                                   
       notificationArray.push(updateUserdata.benchHiring,updateUserdata.marketHiring,updateUserdata.resourcePool, updateUserdata.managementSystem , updateUserdata.pssystem , updateUserdata.clientOnBoard)
       notificationArray.forEach((ele)=>{
        if(ele !== ''){
          finalArray.push(ele)
        }
       })
       const mailOptions = {
        from: process.env.Email,
        to: email,
        subject: "Upadte Credentials of Technoelevate - SSO",
        html: `<b>Hello, <strong>${fullName}</strong><br><br><br>
        You are Access Credentials have been updated for Technoelevate Single Sign-On Application<br><br>
        To the following applications ::   ${finalArray}  <br><br>
    
        Your Login Credentials:<br><br>
        <strong>Email-Id : ${email}</strong><br>
        <strong>password : otp will send to the registered email id.`,
      };

      transporter.sendMail(mailOptions, async (err) => {
        if (!err) {
          res.status(200).json({
            error: false,
            message: "User Updated and  Email Sent successfully",
            response:updateUserdata
          });
        } 
        else {
          res.status(500).json({
            error: true,
            message: "Something went wrong! Please try again later",
          });
        }
      });
    }
     else {
          res.status(400).json({
              error:false,
              message:'User already exists',
          })
      }
    } catch (err) {
        next(err.message);
    }


};


const deleteUser = async(req,res,next)=>{
    try{
      const deleteUserData = await Register.deleteOne({_id:req.params.id})
      if(deleteUserData){
        res.status(200).json({
            error:false,
            message:'User Deleted Successfully',
            response: deleteUserData
        })
      }else{
        res.status(400).json({
            error:true,
            message:'Something Went Wrong'
        })
      }
    }catch(error){
      next(error)
    }
  }

  const UserPagination = async (req, res, next) => {
    try {
        const {
            currentPage,
            pageSize
        } = req.query;

        const skip = parseInt(pageSize) * (parseInt(currentPage) - 1);
        const limit = parseInt(pageSize);
        let mixed = await Register.find().limit(limit).skip(skip).exec();
        let totalmixed = await Register.find();
        let totalLength = totalmixed.length;
        if ((totalmixed, mixed)) {
            res
                .status(200)
                .json({
                    error: false,
                    message: "Register data Fetched Successfully",
                    response: mixed,
                    totalmixed: totalLength,
                });
        } else {
            res.status(404).json({
                error: true,
                message: "No Register Data Found",
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
    UserPagination
}