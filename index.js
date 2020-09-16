const chalk = require('chalk');
const { ShardingManager } = require('discord.js');

process.on('UnhandledPromiseRejectionWarning', function (err) {
  console.log("Taco Beaer")
})

const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN, totalShards: 'auto' });

manager.on('shardCreate', shard => {
  shard.on("ready", () => {
      console.log(`Shard ${shard.id} connected to Discord's Gateway.`)
      shard.send({type: "shardId", data: {shardId: shard.id}});
  });
})

manager.spawn();


