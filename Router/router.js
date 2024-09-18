const express = require('express'); //import express
const router = new express.Router(); //import Router from express

const userController = require('../Controllers/userControllers')

//paths for resolving request

router.get('/user/getuserdetails',(req,res)=>{
    console.log("Inside get user")
    res.send("hello reached inside")
})

router.post('/user/register',userController.register)
router.get('/user/getdetails',userController.getUserDetail)

//export router
module.exports = router