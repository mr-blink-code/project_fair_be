//const appMiddleware = require('./Middlewares/appMiddleware')

const router = require('./Router/router')
require('dotenv').config() // import dot env module

const express = require('express')// import express module
require('./db/connections')
const cors = require('cors') // import cors module
const pfServer = express() // create server using express
pfServer.use(cors()) //inject cors into pfserver

//use middle ware to convert Json data to js object
pfServer.use(express.json())
//pfServer.use(appMiddleware)
pfServer.use(router)

// provide PORT 
const PORT = 4001;

pfServer.listen(PORT,()=>{
    console.log(`pfsever is running in PORT ${PORT}`)
})

pfServer.get('/',(req,res)=>{
    res.send("server for Project fair is running and waiting for Client requests")
})