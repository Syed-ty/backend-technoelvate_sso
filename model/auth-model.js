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
    role:{
       type: String,
    },
    otp:{
        type: Number,
    }
});





const Register = mongoose.model('register',registerSchema);


module.exports = {Register}