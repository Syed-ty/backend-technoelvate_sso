const {
    projectDetails
} = require('../model/projectDetails-model')
const {
    paymentDetails,
    invoiceDetails,
    milestoneDetails
} = require('../model/paymentandInvoice-model')

const getAllProject = async (req, res, next) => {
    try {
        const visitors = await projectDetails.find({});
        res.status(200).json({
            error: false,
            message: "All ProjectDetails list are fetched Sucessfully",
            visitors
        })
    } catch (err) {
        next(err)
    }
}

const addProject = async (req, res, next) => {
    try {
        const {
            projectName,
            projectCost,
            clientName,
            projectType,
            startDate,
            endDate,
            projectLead,
            status,
            projectManager,
            teamLead,
            businessDevelopmentManger,
            Remarks,
            ProjectLeadArray,
            milestoneArray
        } = req.body;
       
        let notificationArray = []
       
        const adduser = await projectDetails.create({
            projectName,
            projectCost,
            clientName,
            projectType,
            startDate,
            endDate,
            projectLead,
            status,
            projectManager,
            teamLead,
            businessDevelopmentManger,
            Remarks,
            ProjectLeadArray
        })

       notificationArray = milestoneArray.map(v => ({...v, ProjectId: adduser._id}))
       notificationArray.forEach( async (ele)=>{
        const mileStoneData = await milestoneDetails.create({
            milestone:ele.milestone,
            paymentPercent:ele.paymentPercent,
            milestonedetails:ele.milestonedetails,
            startMileStoneDate:ele.startMileStoneDate,
            endMileStoneDate:ele.endMileStoneDate,
            mileStoneAmount:ele.mileStoneAmount,
            actualEndDate:ele.actualEndDate,
            ProjectId: ele.ProjectId
        })
    })
        res.status(200).json({
            error: false,
            message: "Project Details are added sucessfully",
        })
    } catch (err) {
        next(err)
    }
}

const getProjectDetailsById = async (req, res, next) => {
    try {
        let Data = await projectDetails.findOne({
            _id: req.params.id
        })
        if (Data) {
            res.status(200).json({
                error: false,
                message: 'Project Details are fetched successfully By Id',
                response: Data
            })
        }
    } catch (error) {
        // next(err)
    }
}

const updateProjectDetails = async (req, res, next) => {
    try {
        const {
            projectName,
            projectCost,
            clientName,
            projectType,
            startDate,
            endDate,
            projectLead,
            status,
            projectManager,
            teamLead,
            businessDevelopmentManger,
            Remarks,
            milestoneArray
        } = req.body;

        const updateData = await projectDetails.findOneAndUpdate({
            _id: req.params.id
        }, {
            projectName,
            projectCost,
            clientName,
            projectType,
            startDate,
            endDate,
            projectLead,
            status,
            projectManager,
            teamLead,
            businessDevelopmentManger,
            Remarks,
            milestoneArray
        }, {
            new: true
        });
        if (updateData) {
            res.status(200).json({
                error: false,
                message: "Project Details are Updated Successfully",
                response: updateData
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Some thing went wrong",
            })
        }
    } catch (err) {
        next(err)
    }
};


const deleteProjectDetails = async (req, res, next) => {
    try {
        const deleteProjectDetails = await projectDetails.deleteOne({
            _id: req.params.id
        })
        const deleteDetails = await invoiceDetails.findOneAndDelete({
            ProjectId: req.params.id
        })
        const paymentdetails = await paymentDetails.findOneAndDelete({
            projectId: req.params.id
        })
        if (deleteProjectDetails ||deleteDetails || paymentdetails) {
            res.status(200).json({
                error: false,
                message: 'User Deleted Successfully',
                response: deleteProjectDetails
            })
        } else {
            res.status(400).json({
                error: true,
                message: 'Something Went Wrong '
            })
        }
    } catch (error) {
        next(error)
    }
}

const projectPagination = async (req, res, next) => {
    try {
        const {
            currentPage,
            pageSize
        } = req.query;

        const skip = parseInt(pageSize) * (parseInt(currentPage) - 1);
        const limit = parseInt(pageSize);
        let mixed = await projectDetails.find().limit(limit).skip(skip).exec();
        let totalmixed = await projectDetails.find();
        let totalLength = totalmixed.length;
        if ((totalmixed, mixed)) {
            res
                .status(200)
                .json({
                    error: false,
                    message: "Project details Fetched Successfully",
                    response: mixed,
                    totalmixed: totalLength,
                });
        } else {
            res.status(404).json({
                error: true,
                message: "No Project Data Found",
            });
        }
    } catch (err) {
        next(err);
    }
};

const getAllData = async (req, res, next) => {
    try {
        const totalPayment = await paymentDetails.aggregate([{
            $group: {
                _id: null,
                totalAmount: {
                    $sum: "$totalAmount"
                }
            }
        }])
        const projectCost = await projectDetails.aggregate([{
            $group: {
                _id: null,
                projectCost: {
                    $sum: "$projectCost"
                }
            }
        }])
        const invoiceCost = await invoiceDetails.aggregate([{
            $group: {
                _id: null,
                invoiceAmount: {
                    $sum: "$invoiceAmount"
                }
            }
        }])
        if((projectCost.length >0) && (invoiceCost.length<1)&&(totalPayment.length<1)){
            let obj = {
                totalPayment: 0,
                projectCost: projectCost[0].projectCost,
                invoiceCost: 0
            }
            res.status(200).json({
                error: false,
                message: "All ProjectDetails list are fetched Sucessfully",
                response: obj
            })
        }
        if((projectCost.length>0) && (invoiceCost.length >0)&&(totalPayment.length<1)){
            let obj = {
                totalPayment: 0,
                projectCost: projectCost[0].projectCost,
                invoiceCost: invoiceCost[0].invoiceAmount
           }
            res.status(200).json({
                error: false,
                message: "All ProjectDetails list are fetched Sucessfully",
                response: obj
            })
        }
        if((projectCost.length>0) && (invoiceCost.length<1)&&(totalPayment.length>0)){
            let obj = {
                 totalPayment: totalPayment[0].totalAmount,
                 projectCost: projectCost[0].projectCost,
                 invoiceCost: 0
           }
            res.status(200).json({
                error: false,
                message: "All ProjectDetails list are fetched Sucessfully",
                response: obj
            })
        }
        if((projectCost.length>0) && (invoiceCost.length>0)&&(totalPayment.length>0)){
            let obj = {
                 totalPayment: totalPayment[0].totalAmount,
                 projectCost: projectCost[0].projectCost,
                 invoiceCost: invoiceCost[0].invoiceAmount
    }
            res.status(200).json({
                error: false,
                message: "All ProjectDetails list are fetched Sucessfully",
                response: obj
            })
        }
       
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllProject,
    addProject,
    getProjectDetailsById,
    updateProjectDetails,
    deleteProjectDetails,
    getAllData,
    projectPagination
}