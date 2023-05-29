const express = require('express');
const router = express.Router();
const projectDetails = require('../controller/projectDetails-controller')

router.post('/add-project', projectDetails.addProject)
router.get('/get-AllProject',projectDetails.getAllProject)
router.put('/updateProject/:id',projectDetails.updateProjectDetails)
router.get('/getProjectById/:id',projectDetails.getProjectDetailsById)
router.delete('/deleteProjectById/:id',projectDetails.deleteProjectDetails)

router.get('/get-AllProjectData',projectDetails.getAllData)

router.get('/project-pagination',projectDetails.projectPagination);

module.exports = router;