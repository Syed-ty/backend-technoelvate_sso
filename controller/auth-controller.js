const {Register} = require('../model/auth-model');
const transporter = require("../helpers/mail.config");



const register = async (req, res, next) => {
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
        const data = await Register.findOne({email:email})
        if (!data) {
            const response = await Register.create({
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
            })
            const notificationArray = []  
            const finalArray = []                                                                                                                   
           notificationArray.push(response.benchHiring,response.marketHiring,response.resourcePool, response.managementSystem , response.pssystem , response.clientOnBoard)
           notificationArray.forEach((ele)=>{
            if(ele !== ''){
              finalArray.push(ele)
            }
           })
          const mailOptions = {
          from: process.env.Email,
          to: email,
          subject: "Registration of SSO",
          html: `<b>Hello, <strong>${fullName}</strong><br><br><br>
          You are successfully registered for Technoelevate Single Sign-On Application<br><br>
          You have access to the following applications ::   ${finalArray}  <br><br>
      
          Your Login Credentials:<br><br>
          <strong>Email-Id : ${email}</strong><br>
          <strong>password : otp will send to the registered email id.`,
        };
        transporter.sendMail(mailOptions, async (err) => {
          if (!err) {
            res.status(200).json({
              error: false,
              message: " User Added and  Email Sent successfully",
              response:email
            });
          } else {
            res.status(500).json({
              error: true,
              message: "Something went wrong! Please try again later",
            });
          }
        });
        }else{
            res.status(400).json({
                error:false,
                message:'User already exists',
            })
        }
    } catch (err) {
        next(err.message);
    }
}

const Login = async (req, res, next) => {
    try {
      const { 
        email, 
      } =req.body; 
      const isAdmin = await Register.findOne({ email: email });
      if (isAdmin) {
        let generateOtp = Math.floor(100000 + Math.random() * 900000);
      const mailOptions = {
        from: process.env.Email,
        to: email,
        subject: "OTP For Login",
        html: `OTP for your verification ${generateOtp}`,
      };
      transporter.sendMail(mailOptions, async (err) => {
        if (!err) {
            const isAdmin = await Register.findOneAndUpdate({ email: email },{
                otp:generateOtp
            });
          res.status(200).json({
            error: false,
            message: "OTP sent successfully",
            response:email
          });
        } else {
        console.log(err.message);
          res.status(500).json({
            error: true,
            message: "Something went wrong! Please try again later",
          });
        }
      });
       
      } else {
        res.status(404).json({ 
          error: true, 
          message: "User with the Email id  does not exist." 
        });
      }
    } catch (err) {
      next(err.message);
    }
  };

  const verifyOtp = async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      var user = await Register.findOne({
        email: email,
      });
  
      if (user) {
        if (user.otp == otp) {
          res.status(200).json({ 
            error: false, 
            response:true,
            message: "OTP verified successfully"})
        } else {
          res.status(404).json({
            error: true,
            message: "In Valid OTP",
          });
        }
      } else {
        res.status(404).json({
          error: true,
          message: "In Valid OTP",
        });
      }
    } catch (err) {
      next(err.message);
    }
  };

module.exports ={
    register,
    Login,
    verifyOtp
}