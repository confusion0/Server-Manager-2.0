const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();

const path = require("path")
const express = require("express")
const websiteRoutes = require('./website/routes')
const server = express()
server.use('/', websiteRoutes)
server.listen(3000, function() { console.log("Web Server is Ready") })