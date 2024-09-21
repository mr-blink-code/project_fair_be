const express = require('express'); //import express
const router = new express.Router(); //import Router from express

const userController = require('../Controllers/userControllers')

//paths for resolving request

router.post('/user/login',userController.login)
router.post('/user/register',userController.register)
router.get('/user/getdetails',userController.getUserDetail)

//export router
module.exports = router