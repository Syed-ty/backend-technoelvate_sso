const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        index:true,
        unique:true
    },
    employeeId:{
        type: String,
    },
    designation:{
       type: String,
    },
    phoneNumber:{
        type:Number
    },
    department:{
        type:String
    },
    gender:{
        type:String
    },
    benchHiring:{
        type:String
    },
    marketHiring:{
        type:String
    },
    resourcePool:{
        type:String
    },
    managementSystem:{
        type:String
    },
    pssystem:{
        type:String
    },
    clientOnBoard:{
        type:String
    },
    otp:{
        type: Number,
    }
});





const Register = mongoose.model('register',registerSchema);


module.exports = {Register}