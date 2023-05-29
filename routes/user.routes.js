const express = require('express');
const router = express.Router();
const user = require('../controller/user-controller')


router.get('/get-alluser',user.getAllUser)
router.put('/update-user/:id',user.updateUser)
router.get('/getUser-id/:id',user.getUserById)
router.get('/getUser-email/:email',user.getUserByEmail)
router.delete('/delete-user/:id',user.deleteUser)
router.get('/user-pagination',user.UserPagination);

module.exports = router;