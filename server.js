const path = require("path")
const express = require("express")
const chalk = require('chalk')
const { mongostatus } = require('./mongo.js')

displaymongostatus()

const server = express()

const websiteRoutes = require('./website/routes')

server.use('/', websiteRoutes)
server.listen(process.env.PORT || 3000, function() { console.log(chalk.green("Web Server is Ready"))})

async function displaymongostatus(){
  const status = await mongostatus()
  if(status) console.log(chalk.green('Web Server Successfully Connected to Mongo'))
  else console.log(chalk.red('Web Server Mongo Connection Error'))
}
