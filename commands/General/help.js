const addInfo = `
[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=739943852726681650&permissions=8&scope=bot)

`

module.exports = {
  name: 'help',
  aliases: [],
  reqPerms: [],
  args: "[command]",
  desc: "Shows all the commands and how to use them.",
  run: async(Discord, client, message, args) => {
    const embed = new Discord.MessageEmbed();
    if(!args[0]){
      let modules = []
      embed.setTitle("📚 Help")
      client.commands.forEach(command => {
        const module = (client.commandFiles.find(element => element.includes(command.name))).replace('commands/', '').replace(`/${command.name}.js`, '')
        modules.push(module)
      })
      modules.forEach(module => {
        if(embed.fields.find(c => c.name === module) && embed.fields.find(c => c.name === module)['name'] === module) return 
        embed.addField(module, "TBD")
      })
      client.commands.forEach(command => {
        const module = (client.commandFiles.find(element => element.includes(command.name))).replace('commands/', '').replace(`/${command.name}.js`, '')

        if(embed.fields.find(c => c.name === module)['value'] === 'TBD') return embed.fields.find(c => c.name === module)['value'] = `\`${command.name}\` `
        embed.fields.find(c => c.name === module)['value'] += `\`${command.name}\` `
      })

      embed.addField("Additional Information", addInfo)

      return message.channel.send(embed)
    }

    let command = {}
    client.commands.forEach($command => {
        if($command.name == `help`) return
        if($command.name == args[0]) command = $command
    })
    if(command === {}) return message.channel.send('I could not find a command with that name.')
    embed.setTitle(`Command Information - ${command.name}`)
    embed.setDescription(command.desc)
    embed.addField("Usage: ", process.env.PREFIX + command.name + " " + command.args)
    if(command.aliases.length > 0) embed.addField("Aliases: ", command.aliases.join(" "))
    if(command.reqPerms.length > 0) embed.addField("Required Permissions: ", command.reqPerms) 
    message.channel.send(embed)
  }
}