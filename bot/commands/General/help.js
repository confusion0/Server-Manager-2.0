const addInfo = `
[Invite Bot](https://discord.com/oauth2/authorize?client_id=739943852726681650&scope=bot&permissions=2146958847)
[Support Server](https://discord.gg/WftFPZc)
[Website](https://servermanager20.herokuapp.com/)
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
      embed.setDescription(`For more info in a command do ${process.env.PREFIX}help <command-name>`)
      client.commands.forEach(command => {
        var module = (client.commandFiles.find(element => element.includes(command.name))).replace('commands/', '').replace(`/${command.name}.js`, '')
        module = module.slice(module.lastIndexOf('/')+1)
        if(module != "Secret") modules.push(module)
      })
      modules.forEach(module => {
        if(embed.fields.find(c => c.name === module) && embed.fields.find(c => c.name === module)['name'] === module) return 
        embed.addField(module, "TBD")
      })
      client.commands.forEach(command => {
        var module = (client.commandFiles.find(element => element.includes(command.name))).replace('commands/', '').replace(`/${command.name}.js`, '')
        module = module.slice(module.lastIndexOf('/')+1)
        if(module == "Secret") return

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
    embed.setDescription("<> means required, and [] means optional")
    embed.addField("Description: ", command.desc)
    embed.addField("Usage: ", process.env.PREFIX + command.name + " " + command.args)
    if(command.aliases.length > 0) embed.addField("Aliases: ", command.aliases.join(" "))
    if(command.reqPerms.length > 0) embed.addField("Required Permissions: ", command.reqPerms) 
    message.channel.send(embed)
  }
}