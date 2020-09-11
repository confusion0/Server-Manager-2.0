const path = require("path")
const express = require("express")
const chalk = require('chalk')

const server = express()

const websiteRoutes = require('./website/routes')

server.use('/', websiteRoutes)
server.listen(process.env.PORT || 3000, function() { console.log(chalk.green("Web Server is Ready"))})
