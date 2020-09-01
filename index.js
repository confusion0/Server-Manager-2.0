const chalk = require('chalk');
const { mongostatus } = require('./mongo.js')
const { ShardingManager } = require('discord.js');

displaymongostatus()

const manager = new ShardingManager('./bot/bot.js', { token: process.env.TOKEN, totalShards: 'auto' });

manager.on('shardCreate', shard => {
  shard.on("ready", () => {
      console.log(`Shard ${shard.id} connected to Discord's Gateway.`)
      shard.send({type: "shardId", data: {shardId: shard.id}});
  });
})

manager.spawn();

async function displaymongostatus(){
  const status = await mongostatus()
  if(status) console.log(chalk.green('ShardingManager Successfully Connected to Mongo'))
  else console.log(chalk.red('ShardingManager Mongo Connection Error'))
}

