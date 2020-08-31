const chalk = require('chalk');
const { mongostatus } = require('./mongo.js')
const { ShardingManager } = require('discord.js');

displaymongostatus()

const manager = new ShardingManager('./bot/bot.js', { token: process.env.TOKEN });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();

async function displaymongostatus(){
  const status = await mongostatus()
  if(status) console.log(chalk.green('ShardingManager Successfully Connected to Mongo'))
  else console.log(chalk.red('ShardingManager Mongo Connection Error'))
}

