const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectDetailsSchema = new Schema({
    projectName:{
        type:String
    },
    projectCost:{
        type:Number
    },
    clientName:{
        type:String
    },
    projectType:{
        type:String
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    projectLead:{
        type:String
    },
    status:{
        type:String
    },
    projectManager:{
        type:String
    },
    teamLead:{
        type:String
    },
    businessDevelopmentManger:{
        type:String
    },
    Remarks:{
        type:String
    },
    ResourceArray:[
        {
            BillableNumber:{type:Number},
            NonBillableNumber:{type:Number},
            totalResource:{type:Number},
          }
    ],
    ProjectLeadArray:[],
    milestoneArray: [{
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
        actualEndDate:{
            type:Date
        },
        mileStoneAmount: {
            type: String
        },
    }],
})

const projectDetails = mongoose.model("projectDetails",projectDetailsSchema);
module.exports = {projectDetails}
