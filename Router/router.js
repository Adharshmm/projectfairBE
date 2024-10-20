// 1)express is imported because it is required for router

const express = require('express');

// 2)router labrary is in the express so import that

const router = new express.Router()
const userController = require("../Controller/userController")
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const multerConfig = require("../Middleware/multerMiddleware")
// 3)different paths for resolving requests

router.post('/user/register',userController.register)
router.post('/user/login',userController.login)
router.post('/project/addproject',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)
router.get('/project/homeproject',projectController.getHomeprojects)
router.get('/project/userproject',jwtMiddleware,projectController.getUserProjects)
router.get('/project/allprojects',jwtMiddleware,projectController.allProject)
router.put('/project/editproject/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)
router.delete('/project/delete/:id',jwtMiddleware,projectController.deleteUserProject)
// 4)export router
module.exports =router