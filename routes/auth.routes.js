const express = require('express');
const router = express.Router();
const auth = require('../controller/auth-controller')

router.post('/add-register', auth.register)
router.post('/login', auth.Login)
router.post('/verify-otp', auth.verifyOtp)


module.exports = router;