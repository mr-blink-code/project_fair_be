const express = require('express'); //import express
const router = new express.Router(); //import Router from express

const userController = require('../Controllers/userControllers')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require ('../Middlewares/jwtMiddleware')
const multerConfig = require ('../Middlewares/multerMiddleware')
//paths for resolving request

router.post('/user/login',userController.login)
router.post('/user/register',userController.register)
router.post('/project/addproject',jwtMiddleware,multerConfig.single('projectImage'),projectController.addproject)

//export router
module.exports = router