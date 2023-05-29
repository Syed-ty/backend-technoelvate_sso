const {
    paymentDetails,
    invoiceDetails,
    resourceDetails,
    milestoneDetails
} = require('../model/paymentandInvoice-model')

const {
    projectDetails
} = require('../model/projectDetails-model')

const getAllPaymentDetails = async (req, res, next) => {
    try {
        const payment = await paymentDetails.find();
        res.status(200).json({
            error: false,
            message: "All paymentDetails list are fetched Sucessfully",
            payment
        })
    } catch (err) {
        next(err)
    }
}

const addPayment = async (req, res, next) => {
    try {
        const {
            recievedDate,
            totalAmount,
            transactionNumber,
            projectId
        } = req.body;
        const paymentData = await paymentDetails.create({
            recievedDate,
            totalAmount,
            transactionNumber,
            projectId
        })
        if (paymentData) {
            res.status(200).json({
                error: false,
                message: "Payment Details are added sucessfully",
                paymentData
            })
        }
    } catch (err) {
        next(err)
    }
}

const getpaymentDetailsByProjectId = async (req, res, next) => {
    try {
        let Data = await paymentDetails.find({
            projectId: req.params.id
        })
        if (Data) {
            res.status(200).json({
                error: false,
                message: 'Payment Details are fetched successfully By Id',
                response: Data
            })
        }
    } catch (error) {
        // next(err)
    }
}

const updatepaymentDetails = async (req, res, next) => {
    try {
        const {
            recievedDate,
            totalAmount,
            transactionNumber,
            projectId
        } = req.body;

        const updateData = await paymentDetails.findOneAndUpdate({
            _id: req.params.id
        }, {
            recievedDate,
            totalAmount,
            transactionNumber,
            projectId
        }, {
            new: true
        });
        if (updateData) {
            res.status(200).json({
                error: false,
                message: "PaymentDetails Details are Updated Successfully",
                response: updateData
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Something went wrong",
            })
        }
    } catch (err) {
        next(err)
    }
};

const deletepaymentDetails = async (req, res, next) => {
    try {
        const deletepaymentDetails = await paymentDetails.deleteOne({
            _id: req.params.id
        })
        if (deletepaymentDetails) {
            res.status(200).json({
                error: false,
                message: 'PaymentDetails deleted successfully',
                response: deletepaymentDetails
            })
        } else {
            res.status(400).json({
                error: true,
                message: 'Something Went Wrong'
            })
        }
    } catch (error) {
        next(error)
    }
}

const getInvoiceDetails = async (req, res, next) => {
    try {
        const invoice = await invoiceDetails.find();
        res.status(200).json({
            error: false,
            message: "All Invoice Details list are fetched Sucessfully",
            invoice
        })
    } catch (err) {
        next(err)
    }
}

const addInvoice = async (req, res, next) => {
    try {
        const {
            invoiceDate,
            invoiceNumber,
            paymentterm,
            invoiceAmount,
            selectedMileStone,
            ProjectId
        } = req.body;
        const paymentData = await invoiceDetails.create({
            invoiceDate,
            invoiceNumber,
            paymentterm,
            invoiceAmount,
            selectedMileStone,
            ProjectId
        })
        if (paymentData) {
            res.status(200).json({
                error: false,
                message: "Invoice Details  are added sucessfully",
                paymentData
            })
        }
    } catch (err) {
        next(err)
    }
}

const getInvoiceDetailsById = async (req, res, next) => {
    try {
        let Data = await invoiceDetails.find({
            ProjectId: req.params.id
        })
        if (Data) {
            res.status(200).json({
                error: false,
                message: 'Invoice Details are fetched successfully By ProjectId',
                response: Data
            })
        }
    } catch (error) {
        // next(err)
    }
}

const updateInvoiceDetails = async (req, res, next) => {
    try {
        const {
            invoiceDate,
            invoiceNumber,
            paymentterm,
            invoiceAmount,
            selectedMileStone,
            projectId
        } = req.body;

        const updateData = await invoiceDetails.findOneAndUpdate({
            _id: req.params.id
        }, {
            invoiceDate,
            invoiceNumber,
            paymentterm,
            invoiceAmount,
            selectedMileStone,
            projectId
        }, {
            new: true
        });
        if (updateData) {
            res.status(200).json({
                error: false,
                message: "Invoice Details are Updated Successfully",
                response: updateData
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Something went wrong",
            })
        }
    } catch (err) {
        next(err)
    }
};

const deleteInvoiceDetails = async (req, res, next) => {
    try {
        const deleteDetails = await invoiceDetails.deleteOne({
            _id: req.params.id
        })
        if (deleteDetails) {
            res.status(200).json({
                error: false,
                message: 'Invoice Details deleted successfully',
                response: deleteDetails
            })
        } else {
            res.status(400).json({
                error: true,
                message: 'Something Went Wrong'
            })
        }
    } catch (error) {
        next(error)
    }
}

const getResourcesDetails = async (req, res, next) => {
    try {
        const resourcedata = await resourceDetails.find();
        res.status(200).json({
            error: false,
            message: "All Resource Details list are fetched Sucessfully",
            resourcedata
        })
    } catch (err) {
        next(err)
    }
}


const getMileStoneDetails = async (req, res, next) => {
    try {
        const resourcedata = await milestoneDetails.find();
        res.status(200).json({
            error: false,
            message: "All MileStone Details list are fetched Sucessfully",
            resourcedata
        })
    } catch (err) {
        next(err)
    }
}

const addResource = async (req, res, next) => {
    try {
        const {
            employeeId,
            fullName,
            email,
            payment,
            ProjectId
        } = req.body;
        const resourceData = await resourceDetails.create({
            employeeId,
            fullName,
            email,
            payment,
            ProjectId
        })
        const projectData = await projectDetails.findById({
            _id: req.body.ProjectId
        })
        let ResourecArr = []
        let notificationArray = []
        if (projectData.ResourceArray.length > 0) {
            let Objs = {
                payment: req.body.payment
            }
            ResourecArr.push(Objs)
            if (ResourecArr.some(code => code.payment === 'Billable')) {
                projectData.ResourceArray.forEach((data) => {
                    let altereddata = (data.BillableNumber += 1)
                    let totaldata = (altereddata) + (data.NonBillableNumber)
                    let obj = {
                        BillableNumber: parseInt(altereddata),
                        NonBillableNumber: parseInt(data.NonBillableNumber),
                        totalResource: totaldata,
                    }
                    notificationArray.push(obj)
                })
            }
            if (ResourecArr.some(code => code.payment === 'Non-Billable')) {
                projectData.ResourceArray.forEach((data) => {
                    let altereddata = (data.NonBillableNumber += 1)
                    let totaldata = (altereddata) + (data.BillableNumber)
                    let obj = {
                        BillableNumber: parseInt(data.BillableNumber),
                        NonBillableNumber: parseInt(altereddata),
                        totalResource: totaldata,
                    }
                    notificationArray.push(obj)
                })
            }
        } else {
            let Objs = {
                payment: req.body.payment
            }
            ResourecArr.push(Objs)
            if (ResourecArr.some(code => code.payment === 'Billable')) {
                let javascript_freelancers = ResourecArr.filter(function (freelancer) {
                    return freelancer.payment === "Billable";
                });
                if (javascript_freelancers.length === 1) {
                    let obj = {
                        BillableNumber: javascript_freelancers.length,
                        NonBillableNumber: 0,
                        totalResource: ResourecArr.length
                    }
                    notificationArray.push(obj)
                }

            }
            if (ResourecArr.some(code => code.payment === 'Non-Billable')) {
                let javascript_freelancers = ResourecArr.filter(function (freelancer) {
                    return freelancer.payment === "Non-Billable";
                });
                if (javascript_freelancers.length === 1) {
                    let obj = {
                        NonBillableNumber: javascript_freelancers.length,
                        BillableNumber: 0,
                        totalResource: ResourecArr.length
                    }
                    notificationArray.push(obj)
                }
            }
        }
        await projectDetails.updateOne({
            _id: req.body.ProjectId
        }, {
            ResourceArray: notificationArray
        });
        if (resourceData) {
            res.status(200).json({
                error: false,
                message: "Resource Details  are added sucessfully",
                resourceData
            })
        }
    } catch (err) {
        next(err)
    }
}

const addMileStone = async (req, res, next) => {
    try {
        const {
            milestone,
            paymentPercent,
            milestonedetails,
            startMileStoneDate,
            endMileStoneDate,
            mileStoneAmount,
            actualEndDate,
            ProjectId
        } = req.body;
        const mileStoneData = await milestoneDetails.create({
            milestone,
            paymentPercent,
            milestonedetails,
            startMileStoneDate,
            endMileStoneDate,
            actualEndDate,
            mileStoneAmount,
            ProjectId
        })
        if (mileStoneData) {
            res.status(200).json({
                error: false,
                message: "MileStone Details  are added sucessfully",
                mileStoneData
            })
        }
    } catch (err) {
        next(err)
    }
}

const getResourceDetailsById = async (req, res, next) => {
    try {
        let Data = await resourceDetails.find({
            ProjectId: req.params.id
        })
        if (Data) {
            res.status(200).json({
                error: false,
                message: 'Resource Details are fetched successfully By ProjectId',
                response: Data
            })
        }
    } catch (error) {
        // next(err)
    }
}


const getMileStoneDetailsById = async (req, res, next) => {
    try {
        let Data = await milestoneDetails.find({
            ProjectId: req.params.id
        })
        if (Data) {
            res.status(200).json({
                error: false,
                message: 'MileStone Details are fetched successfully By ProjectId',
                response: Data
            })
        }
    } catch (error) {
        // next(err)
    }
}


const updateResourceDetails = async (req, res, next) => {
    try {
        const {
            employeeId,
            fullName,
            email,
            payment,
            ProjectId
        } = req.body;
        const updateData = await resourceDetails.findOneAndUpdate({
            _id: req.params.id
        }, {
            employeeId,
            fullName,
            email,
            payment,
            ProjectId
        }, {
            new: true
        });
        const projectData = await projectDetails.findById({
            _id: req.body.ProjectId
        })
        let ResourecArr = []
        let notificationArray = []
        let Objs = {
            payment: req.body.payment
        }
        ResourecArr.push(Objs)
        if (ResourecArr.some(code => code.payment === 'Billable')) {
            projectData.ResourceArray.forEach((data) => {
                let altereddata = (data.BillableNumber += 1)
                let NonAlterteddata = (data.NonBillableNumber -= 1)
                let obj = {
                    BillableNumber: altereddata,
                    NonBillableNumber: NonAlterteddata,
                    totalResource: (data.totalResource),
                }
                notificationArray.push(obj)
            })
        }
        if (ResourecArr.some(code => code.payment === 'Non-Billable')) {
            projectData.ResourceArray.forEach((data) => {
                let altereddata = (data.NonBillableNumber += 1)
                let obj = {
                    BillableNumber: parseInt(data.BillableNumber -= 1),
                    NonBillableNumber: parseInt(altereddata),
                    totalResource: (data.totalResource),
                }
                notificationArray.push(obj)
            })
        }

        await projectDetails.findOneAndUpdate({
            _id: req.body.ProjectId
        }, {
            $set: {
                ResourceArray: notificationArray
            }
        }, {
            new: true,
        });

        if (updateData) {
            res.status(200).json({
                error: false,
                message: "Resource Details are Updated Successfully",
                response: updateData
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Something went wrong",
            })
        }
    } catch (err) {
        next(err)
    }
};

const updateMileStoneDetails = async (req, res, next) => {
    try {
        const {
            milestone,
            paymentPercent,
            milestonedetails,
            startMileStoneDate,
            endMileStoneDate,
            mileStoneAmount,
            actualEndDate,
            ProjectId
        } = req.body;
        const updateData = await milestoneDetails.findOneAndUpdate({
            _id: req.params.id
        }, {
            milestone,
            paymentPercent,
            milestonedetails,
            startMileStoneDate,
            endMileStoneDate,
            mileStoneAmount,
            actualEndDate,
            ProjectId
        }, {
            new: true
        });
        

        if (updateData) {
            res.status(200).json({
                error: false,
                message: "MileStone Details are Updated Successfully",
                response: updateData
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Something went wrong",
            })
        }
    } catch (err) {
        next(err)
    }
};

const deleteResourceDetails = async (req, res, next) => {
    try {
        const resDetails = await resourceDetails.findById({
            _id: req.params.id
        })
        const projectData = await projectDetails.findById({
            _id: resDetails.ProjectId
        })
        let notificationArray = []
        if (resDetails.payment === 'Billable') {
            projectData.ResourceArray.forEach((data) => {
                let obj = {
                    BillableNumber: (data.BillableNumber - 1),
                    NonBillableNumber: (data.NonBillableNumber),
                    totalResource: (data.totalResource - 1),
                }
                notificationArray.push(obj)
            })
        }
        if (resDetails.payment === 'Non-Billable') {
            projectData.ResourceArray.forEach((data) => {
                let Objs = {
                    BillableNumber: (data.BillableNumber),
                    NonBillableNumber: (data.NonBillableNumber - 1),
                    totalResource: (data.totalResource - 1),
                }
                notificationArray.push(Objs)
            })
        }
       await projectDetails.findOneAndUpdate({
            _id: resDetails.ProjectId
        }, {
            $set: {
                ResourceArray: notificationArray
            }
        }, {
            new: true,
        });
        const deleteDetails = await resDetails.deleteOne()

        if (deleteDetails) {
            res.status(200).json({
                error: false,
                message: 'Resource Details Deleted Successfully',
                response: deleteDetails
            })
        } else {
            res.status(400).json({
                error: true,
                message: 'Something Went Wrong'
            })
        }
    } catch (error) {
        next(error)
    }
}


const deleteMileStoneDetails = async (req, res, next) => {
    try {
        const resDetails = await milestoneDetails.findById({
            _id: req.params.id
        })
        const deleteDetails = await resDetails.deleteOne()
        if (deleteDetails) {
            res.status(200).json({
                error: false,
                message: 'Resource Details Deleted Successfully',
                response: deleteDetails
            })
        } else {
            res.status(400).json({
                error: true,
                message: 'Something Went Wrong'
            })
        }
    } catch (error) {
        next(error)
    }
}





const getAllInvoiceDataBasedOnMonth = async (req, res, next) => {
    try {
        let inputYear = req.params
        const invoicedata = await invoiceDetails.aggregate([{

            $group: {
                _id: {
                    year: {
                        $year: "$invoiceDate"
                    },
                    month: {
                        $month: "$invoiceDate"
                    }
                },
                total_cost_month: {
                    $sum: "$invoiceAmount"
                }
            }
        }])
        finalArray = []

        invoicedata.forEach((ele) => {
            if (ele._id.year === parseInt(inputYear.id)) {
                let obj = {
                    index: (ele._id.month),
                    amount: (ele.total_cost_month)
                }
                finalArray.push(obj)
            }
        })
        res.status(200).json({
            error: false,
            message: "All Details list are fetched Sucessfully",
            response: finalArray
        })
    } catch (err) {
        next(err)
    }
}

const getAllPaymentDataBasedOnMonth = async (req, res, next) => {
    try {
        let inputYear = req.params
        const paymentdata = await paymentDetails.aggregate([{

            $group: {
                _id: {
                    year: {
                        $year: "$recievedDate"
                    },
                    month: {
                        $month: "$recievedDate"
                    }
                },
                total_cost_month: {
                    $sum: "$totalAmount"
                }
            }
        }])

        finalArray = []

        paymentdata.forEach((ele) => {
            if (ele._id.year === parseInt(inputYear.id)) {
                let obj = {
                    index: (ele._id.month),
                    amount: (ele.total_cost_month)
                }
                finalArray.push(obj)
            }
        })
        res.status(200).json({
            error: false,
            message: "All Details list are fetched Sucessfully",
            response: finalArray
        })
    } catch (err) {
        next(err)
    }
}

const getAllInvoiceDataBasedOnQuaterMonths = async (req, res, next) => {
    try {
        let inputYear = req.params
        const invoicedata = await invoiceDetails.aggregate([{
            $group: {
                _id: {
                    $dateTrunc: {
                        date: "$invoiceDate",
                        unit: "quarter"
                    },
                },
                total: {
                    $count: {}
                },
                totalInvoiceAmt:{
                    $sum: "$invoiceAmount"
                }
            }
        }])
        finalArray = []
        let inputArray = []
        let arr = req.params.id.split('-')
          arr.forEach((ele)=>{
            inputArray.push(parseInt(ele.substr(0,4)))
          })
        invoicedata.forEach((ele)=>{
            if(ele._id.getFullYear() === (inputArray[0])){
                if(ele._id.getMonth()>0){
                if(ele._id.getMonth() === 3){
                    let obj={
                        secondQuater:ele._id,
                        amount:ele.totalInvoiceAmt,
                        id:0
                    }
                    finalArray.push(obj)
                }
                if(ele._id.getMonth() === 6){
                    let objs={
                        thirdQuater:ele._id,
                        amount:ele.totalInvoiceAmt,
                        id:1
                    }
                    finalArray.push(objs)
                }
                if(ele._id.getMonth() === 9){
                    let objdata={
                        fourthQuater:ele._id,
                        amount:ele.totalInvoiceAmt,
                        id:2
                    }
                    finalArray.push(objdata)
                }
               }
              }
              if(ele._id.getFullYear() === (inputArray[1])){
                  if(ele._id.getMonth() === 0){
                    let objsdata={
                        firstNextYearQuater:ele._id,
                        amount:ele.totalInvoiceAmt,
                        id:3
                    }
                    finalArray.push(objsdata)           
                 }
               }
            })
        res.status(200).json({
            error: false,
            message: "All Details list are fetched Sucessfully",
            response: finalArray
        })
    } catch (err) {
        next(err)
    }
}

const getAllPaymentDataBasedOnQuaterMonths = async (req, res, next) => {
    try {
        let inputYear = req.params
        const invoicedata = await paymentDetails.aggregate([{
            $group: {
                _id: {
                    $dateTrunc: {
                        date: "$recievedDate",
                        unit: "quarter"
                    },
                },
                total: {
                    $count: {}
                },
                totalInvoiceAmt:{
                    $sum: "$totalAmount"
                }
            }
        }])
        finalArray = []
        let inputArray = []
        let arr = req.params.id.split('-')
          arr.forEach((ele)=>{
            inputArray.push(parseInt(ele.substr(0,4)))
          })
        invoicedata.forEach((ele)=>{
            if(ele._id.getFullYear() === (inputArray[0])){
                if(ele._id.getMonth()>0){
                if(ele._id.getMonth() === 3){
                    let obj={
                        secondQuater:ele._id,
                        amount:ele.totalInvoiceAmt,
                        id:0
                    }
                    finalArray.push(obj)
                }
                if(ele._id.getMonth() === 6){
                    let objs={
                        thirdQuater:ele._id,
                        amount:ele.totalInvoiceAmt,
                        id:1
                    }
                    finalArray.push(objs)
                }
                if(ele._id.getMonth() === 9){
                    let objdata={
                        fourthQuater:ele._id,
                        amount:ele.totalInvoiceAmt,
                        id:2
                    }
                    finalArray.push(objdata)
                }
               }
              }
              if(ele._id.getFullYear() === (inputArray[1])){
                  if(ele._id.getMonth() === 0){
                    let objsdata={
                        firstNextYearQuater:ele._id,
                        amount:ele.totalInvoiceAmt,
                        id:3
                    }
                    finalArray.push(objsdata)           
                 }
               }
            })
        res.status(200).json({
            error: false,
            message: "All Details list are fetched Sucessfully",
            response: finalArray
        })
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getAllPaymentDetails,
    addPayment,
    getpaymentDetailsByProjectId,
    updatepaymentDetails,
    deletepaymentDetails,
    getInvoiceDetails,
    addInvoice,
    getInvoiceDetailsById,
    updateInvoiceDetails,
    deleteInvoiceDetails,
    getResourcesDetails,
    addResource,
    getResourceDetailsById,
    updateResourceDetails,
    deleteResourceDetails,
    getAllInvoiceDataBasedOnMonth,
    getAllPaymentDataBasedOnMonth,
    getAllInvoiceDataBasedOnQuaterMonths,
    getAllPaymentDataBasedOnQuaterMonths,

    getMileStoneDetails,
    addMileStone,
    getMileStoneDetailsById,
    updateMileStoneDetails,
    deleteMileStoneDetails
}