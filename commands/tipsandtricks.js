const customembed = `
**Requirements**
  1. Title must be less than 1024 chars
  2. Description must be less than 1024 chars
**Tips and Tricks**
  1. If you are planning embed text that is longer than 1024 chars, consider spliting the text into pieces no longer than 1024 and do multiple embeds with empty titles.
`

const main = 'Please specify a module: `custom-embed`'

module.exports = {
  name: 'tips-and-tricks',
  aliases: ['tipsandtricks', 'tt', 'tips'],
  run: async(Discord, client, message, args) => {
    if(!args[0]){
      const embed = new Discord.MessageEmbed()
      .setTitle("Tips and Tricks")
      .setDescription(main)
      message.channel.send(embed)
    }
    if(args[0] === "custom-embed"){
      const embed = new Discord.MessageEmbed()
      .setDescription(customembed)
      message.channel.send(embed)
    }
    //if(args[0] === ""){
      //const embed = new Discord.MessageEmbed()
      //.setDescription(customembed)
      //message.channel.send(embed)
    //}
  }
}