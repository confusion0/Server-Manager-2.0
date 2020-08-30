const path = require("path")
const express = require("express")
const websiteRoutes = require('./website/routes')
const server = express()
server.use('/', websiteRoutes)
server.listen(3000, function() { console.log("Web Server is Ready") })