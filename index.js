const chalk = require('chalk');
const path = require('path');

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

// Sharding Setup
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager(path.join(__dirname, './bot.js'), {
	token: process.env.TOKEN,
	totalShards: 'auto'
});
manager.on('shardCreate', shard => {
	shard.on('ready', () => {
		console.log(`Shard ${shard.id} connected to Discord's Gateway.`);
		shard.send({ type: 'shardId', data: { shardId: shard.id } });
	});
});

manager.spawn();

// MongoDB Setup
const mongo = require('./mongo');

mongo().then(connection => {
	console.log('MongoDB Connection Established!');
});
