const chalk = require('chalk');
const { ShardingManager } = require('discord.js');
const path = require('path')

const manager = new ShardingManager(path.join(__dirname,'./bot.js'), { token: process.env.TOKEN, totalShards: 'auto' });

manager.on('shardCreate', shard => {
  console.log('SHARD CREATED')
  shard.on("ready", () => {
      console.log(`Shard ${shard.id} connected to Discord's Gateway.`)
      shard.send({type: "shardId", data: {shardId: shard.id}});
  });
})

manager.spawn();


