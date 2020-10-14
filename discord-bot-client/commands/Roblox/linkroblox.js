const { MessageEmbed } = require('discord.js')
const noblox = require('noblox.js')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  name: 'linkroblox',
  aliases: ['lr'],
  reqPerm: "NONE",
  args: "",
  cooldown: 3000,
  desc: "Prompt the user to verify and if successful will link their roblox with their discord.",
  example: [],
  run: async(client, message, args) => {
    const user = message.author
    const channel = await user.createDM()
    const filter = m => m.author.id === user.id

    if(!channel) return message.channel.send('I am unable to direct message you, please enable your direct messages to continue.')
  
    message.reply('Check your DM\'s')

    user.send(
      new MessageEmbed()
      .setTitle('Roblox Linking')
      .setColor("BLUE")
      .setDescription("❓ What's your ROBLOX username?")
    )
    
    let collected1 = await channel.awaitMessages(filter, { max: 1, time: 200000 }) 
    if(collected1 === undefined) return user.send(
        new MessageEmbed()
        .setTitle('Roblox Linking Error')
        .setDescription('You ran out of time. Try to answer quicker next time.')
        .setColor("RED")
      )
    collected1 = collected1.first()
     
    if(collected1.content.toLowerCase().includes('cancel')) return user.send(
        new MessageEmbed()
        .setTitle('Roblox Linking Cancelled')
        .setDescription('You cancelled linking')
        .setColor("RED")
      )
    
    const foundId = await noblox.getIdFromUsername(collected1.content).catch(() => {})
    if(foundId === undefined) return user.send(
        new MessageEmbed()
        .setTitle('Roblox Linking Error')
        .setDescription('You didn\'t enter a valid username. Run the command again to try again.')
        .setColor("RED")
      )
    
    const vString = makeid(12)

    user.send(
      new MessageEmbed()
      .setTitle('Roblox Linking')
      .setDescription("Hello **" + collected1.content + "**, to verify that you are that user. Please put this in your **Roblox** description, or **Roblox** status. \n `" + vString + "`\n\nSay **done** when complete.\nSay **cancel** to cancel.")
      .setColor("BLUE")
    )

    user.send('Mobile Freindly: `' + vString + '`')
  
    let collected2 = await channel.awaitMessages(filter, { max: 1, time: 200000 })
    if(collected2 === undefined) return user.send(
        new MessageEmbed()
        .setTitle('Roblox Linking Error')
        .setDescription('You ran out of time. Try to answer quicker next time.')
        .setColor("RED")
      )
    collected2 = collected2.first()
  
    if(collected2.content.toLowerCase().includes('done')) {
      user.send(
        new MessageEmbed()
        .setTitle('Roblox Linking')
        .setDescription('Fetching your blurb and status...')
        .setColor("BLUE")
      )
    
      await sleep(1000)
  
      const status = await noblox.getStatus(foundId)
      const blurb = await noblox.getBlurb(foundId)
      
      if(status.includes(vString) || blurb.includes(vString)) {
        user.send(
          new MessageEmbed()
          .setTitle('Roblox Linking Successful')
          .setDescription(`Verification successful, you can now verify yourself in servers by doing the \`rverify\` command!`)
          .setColor("GREEN")
        )
        
        client.uData.set(`${user.id}:robloxID`, foundId)
      } else {
        return user.send(
          new MessageEmbed()
          .setTitle('Roblox Linking Unsuccessful')
          .setDescription(`Your status: \`${status}\` \nYour blurb: \`${blurb}\` \n\nRequested: \`${vString}\``)
          .setColor("RED")
        )
      }
    } else { 
      if(collected2.content.toLowerCase().includes('cancel')) return user.send(
        new MessageEmbed()
        .setTitle('Roblox Linking Cancelled')
        .setDescription('You cancelled linking.')
        .setColor("RED")
      )
      user.send(
        new MessageEmbed()
        .setTitle('Roblox Linking Error')
        .setDescription('You entered a invalid response. Run the command to try again.')
        .setColor("RED")
      )
    }
  }
}

function makeid(length) {
  var text = "";
  var selectFruit = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😲','😝','🤑','🤯','😭','😑','😶','😋','🙆','👉','👇','🧠','💼','👮🏻','👍🏼','👎🏼','🐵','🌨','☁️','💧','🎬','🎧','🎮','🎲','🏅','🥇','🥈','🥉','🏆','🏒','🍎','🍫','🍿','🍪','🥛','🍽','🍴','🐑','🦀','🐔','🐭','🦊','🐧','🐞','🌍','🌏','🌕','🌖','🌚','🌝','🌵','🎄','🌲','☀️','⛅️','☔️','🍋'];
  for(var i = length; i > 0; i--){
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
  } 
  return text;
}