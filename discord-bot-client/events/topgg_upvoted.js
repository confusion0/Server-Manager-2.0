const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
  name: 'topgg_upvoted',
  run: async(client) => {
    const DBL = require("dblapi.js");
    const dbl = new DBL(process.env.TOPGG_TOKEN, { webhookPort: process.env.TOPGG_WEBHOOK_PORT, webhookAuth: process.env.TOPGG_WEBHOOK_PASSWORD });

    dbl.on('error', (error) => console.log(`Top.gg Error: ${error}`) )

    const postStats = () => {
      const { totalGuilds, totalChannels, totalMembers, shardId } = client
      dbl.postStats(totalGuilds, shardId, client.shard.count);
    }

    sleep(2000).then(() => postStats())

    setInterval(postStats, 1800000);

    dbl.on('posted', () => {
      console.log('Server count posted!');
    })

    dbl.webhook.on('ready', hook => {
      console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
    });
    
    dbl.webhook.on('vote', vote => {
      //if(vote.type == 'test') return console.log('Test POST Recived!')
      console.log(`User with ID ${vote.user} just voted!`);
      client.voted(vote.user, 'top.gg')
    });
  }
}