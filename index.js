const chalk = require('chalk');
const { ShardingManager } = require('discord.js');
const path = require('path')

const manager = new ShardingManager(path.join(__dirname,'./bot.js'), { token: process.env.TOKEN, totalShards: 'auto' });

manager.on('shardCreate', shard => {
  shard.on("ready", () => {
      console.log(`Shard ${shard.id} connected to Discord's Gateway.`)
      shard.send({type: "shardId", data: {shardId: shard.id}});
  });
})

manager.spawn()

// const Keyv = require('keyv')

// const gData = new Keyv('mongodb://discord_bot:Jw9N6LOAAkseI24t@servermanager20.2uzgc.mongodb.net:27017/gData?retryWrites=true&w=majority', {namespace:'guilds'})