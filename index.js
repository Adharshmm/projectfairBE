const router = require('./Router/router')
//const middleware = require('./Middleware/appMiddleware')
// 1)import dotenv module
require('dotenv').config()
// 2)import express module
const express = require('express')
require('./DB/connections')
//3)import cors module
const cors = require('cors')
//4)create server using express
const pfServer = express()
//5) inject cors into pfServer
pfServer.use(cors())
// 6)use mddleware to convet json data to js object
pfServer.use(express.json())
//application middleware here
//pfServer.use(middleware)
pfServer.use(router)
//pfserver should expose the uploads folder
pfServer.use('/uploads',express.static('./uploads'))
// 7)povide PORT
const PORT = 4000;
// 8)Run the server
pfServer.listen(PORT, () => {
    console.log("pfServer is running in PORT 4000");

})
pfServer.get('/', (req, res) => {
    res.send('server for projectfair is running and waiting for client requist HELLO WELCOME')
})