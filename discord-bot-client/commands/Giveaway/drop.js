const { MessageEmbed } = require('discord.js')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
  name: 'drop',
  aliases: [],
  reqPerm: "MANAGE_GUILD",
  args: "<drop time in milliseconds> <drop timeout> <prize",
  cooldown: 2000,
  desc: "Starts a drop with the specified args.",
  example: ['300 5s nitro', '100 20s premium'],
  run: async(client, message, args) => {
    var secs = args[0]
    args.shift()
    var timeoutMins = args[0]
    args.shift()
    const prize = args.join().replace(",", " ")

    var alt = Math.floor(10000 + Math.random()*2000)

    const dropSpeed = alt/secs
    
    const embed = new MessageEmbed()
    .setTitle("✈️ A Airdrop Apeared!")
    .setDescription(`Airdrop Altitude: ${Math.floor(alt)}m \nEstemated Drop Time Left: ${secs} secs`)

    const airdrop = await message.channel.send(embed)
    for(; secs > 0; secs -= 1){
      alt -= dropSpeed
      await sleep(1000)
      embed.setDescription(`Airdrop Altitude: ${Math.floor(alt)}m \nEstemated Drop Time Left: ${secs} secs`)
      airdrop.edit(embed)
    }


    
    embed.setTitle("The Airdrop Has Landed!")
    .setDescription("First one to react with 📥 below gets **" + prize + "**")

    await airdrop.edit(embed)
    airdrop.react('📥')

    const filter = (reaction, user) => {
      return !user.bot && reaction.emoji.name === '📥'
    };

    let winner = false

    const collector = airdrop.createReactionCollector(filter, { time: timeoutMins*60*1000 });

    collector.on('collect', (reaction, user) => {
      winner = user
      collector.stop()
    });

    collector.on('end', collected => {
      embed.setTitle("Airdrop Ended")
      if(!winner) {
        embed.setDescription("Nobody Claimed the Airdrop. Airdrop was airlifted back to base.")
      }
      else {
        embed.setDescription(`${winner} claimed ${message.author}'s airdrop. **${winner.tag}** has won **${prize}**`)
      }
      airdrop.edit(embed) 
    });
  }
}

function randomEmoji() {
  var selectFruit = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😲','😝','🤑','🤯','😭','😑','😶','😋','🙆','👉','👇','🧠','💼','👮🏻','👍🏼','👎🏼','🐵','🌨','☁️','💧','🎬','🎧','🎮','🎲','🏅','🥇','🥈','🥉','🏆','🏒','🍎','🍫','🍿','🍪','🥛','🍽','🍴','🐑','🦀','🐔','🐭','🦊','🐧','🐞','🌍','🌏','🌕','🌖','🌚','🌝','🌵','🎄','🌲','☀️','⛅️','☔️','🍋'];
  return selectFruit[Math.floor(Math.random() * selectFruit.length)];
}
