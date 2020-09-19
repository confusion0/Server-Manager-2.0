console.log('Start of index.js')

const chalk = require('chalk');
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN, totalShards: 'auto' });

console.log('After shard manager is created')

manager.on('shardCreate', shard => {
  shard.on("ready", () => {
      console.log(`Shard ${shard.id} connected to Discord's Gateway.`)
      shard.send({type: "shardId", data: {shardId: shard.id}});
  });
})

console.log('After shard manager listener is created')

manager.spawn();

console.log('After shard manager spawned')


