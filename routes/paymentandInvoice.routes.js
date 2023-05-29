const express = require('express');
const router = express.Router();
const paymentDetails = require('../controller/paymentandInvoice-controller')
const invoiceDetails = require('../controller/paymentandInvoice-controller')
const resourceDetails = require('../controller/paymentandInvoice-controller')
const mileStoneDetails = require('../controller/paymentandInvoice-controller')


router.post('/add-payment', paymentDetails.addPayment)
router.get('/get-AllPayment',paymentDetails.getAllPaymentDetails)
router.put('/updatePayment/:id',paymentDetails.updatepaymentDetails)
router.get('/getPaymentById/:id',paymentDetails.getpaymentDetailsByProjectId)
router.delete('/deletePaymentById/:id',paymentDetails.deletepaymentDetails)


router.post('/add-invoice', invoiceDetails.addInvoice)
router.get('/get-AllInvoice',invoiceDetails.getInvoiceDetails)
router.put('/updateInvoice/:id',invoiceDetails.updateInvoiceDetails)
router.get('/getInvoiceById/:id',invoiceDetails.getInvoiceDetailsById)
router.delete('/deleteInvoiceById/:id',invoiceDetails.deleteInvoiceDetails)


router.post('/add-resource', resourceDetails.addResource)
router.get('/get-AllResource',resourceDetails.getResourcesDetails)
router.put('/updateResource/:id',resourceDetails.updateResourceDetails)
router.get('/getResourceById/:id',resourceDetails.getResourceDetailsById)
router.delete('/deleteResourceById/:id',resourceDetails.deleteResourceDetails)

router.get('/get-Alldata/:id',invoiceDetails.getAllInvoiceDataBasedOnMonth)

router.get('/get-Paymentdata/:id',invoiceDetails.getAllPaymentDataBasedOnMonth)

router.get('/getInvoiceByQuaterMonths/:id',invoiceDetails.getAllInvoiceDataBasedOnQuaterMonths)

router.get('/getPaymentByQuaterMonths/:id',invoiceDetails.getAllPaymentDataBasedOnQuaterMonths)

// MileStone api routes

router.post('/add-milestone', mileStoneDetails.addMileStone)
router.get('/getMileStoneById/:id',mileStoneDetails.getMileStoneDetailsById)
router.put('/updateMileStone/:id',mileStoneDetails.updateMileStoneDetails)
router.delete('/deleteMileStoneById/:id',mileStoneDetails.deleteMileStoneDetails)


module.exports = router;