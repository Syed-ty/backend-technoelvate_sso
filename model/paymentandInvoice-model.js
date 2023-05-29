const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const paymentDetailsSchema = new Schema({
    recievedDate:{
        type:Date
    },
    totalAmount:{
        type:Number
    },
    transactionNumber:{
        type:String
    },
    projectId:{
        type:String
    }
})
const invoiceDetailsSchema = new Schema({
    invoiceDate:{
        type:Date
    },
    invoiceNumber:{
        type:String
    },
    paymentterm:{
        type:String
    },
    invoiceAmount:{
        type:Number
    },
    selectedMileStone:{
        type:String
    },
    ProjectId:{
        type:String
    }
})

const resourcesDetailsSchema = new Schema({
    employeeId:{
        type:String
    },
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    payment:{
        type:String
    },
    ProjectId:{
        type:String
    }
})

const mileStoneDetailsSchema = new Schema({
    milestone: {
        type: String
    },
    paymentPercent: {
        type: String
    },
    milestonedetails: {
        type: String
    },
    startMileStoneDate:{
        type:Date
    },
    endMileStoneDate:{
        type:Date
    },
    mileStoneAmount: {
        type: String
    },
    actualEndDate: {
        type: Date
    },
    ProjectId:{
        type:String
    }
})

const paymentDetails = mongoose.model("paymentDetails",paymentDetailsSchema);
const invoiceDetails = mongoose.model("invoiceDetails",invoiceDetailsSchema);
const resourceDetails = mongoose.model("resourcesDetails",resourcesDetailsSchema);
const milestoneDetails = mongoose.model("milestoneDetails",mileStoneDetailsSchema);


module.exports = {
    paymentDetails,
    invoiceDetails,
    resourceDetails,
    milestoneDetails
}
