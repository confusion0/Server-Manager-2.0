const { MessageEmbed } = require('discord.js')
const path = require('path')

const addInfo = `
[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=739943852726681650&permissions=8&scope=bot)
[Support Server](https://discord.gg/WftFPZc)
[Website](https://servermanager20.herokuapp.com/)
`

module.exports = {
  name: 'help',
  aliases: [],
  reqPerm: "NONE",
  args: "[command]",
  module: "General",
  desc: "Shows all the commands and how to use them.",
  example: ['', 'ping', 'snipe'],
  run: async(client, message, args) => {
    const embed = new MessageEmbed();
    const serverprefix = (await client.gData.get(message.guild.id)).prefix
    if(!args[0]){
      let modules = []
      embed.setTitle("📚 Help")
      embed.setDescription(`For more info in a command do ${serverprefix}help <command-name> \nPrefix: \`${serverprefix}\``)
      
      client.commands.forEach(command => {
        const filepath = client.commandFiles.find(filepath => filepath.includes(command.name))
        const module = getModuleFromPath(filepath)
        
        if(module == "Secret") return
        
        var field = embed.fields.find(field => field.name == module)
        
        if(!field) {
          embed.addField(module, 'NONE')
          field = embed.fields.find(field => field.name == module)
        }
        if(field.value == "NONE") field.value = '`'+ command.name +'`'
        else field.value += `, \`${command.name}\``
      })
      
      embed.addField("Additional Information", addInfo)

      return message.channel.send(embed)
    }

    let command = {}
    client.commands.forEach($command => {
        if($command.name == args[0]) command = $command
    })
    if(command === {}) return message.channel.send('I could not find a command with that name.')
    embed.setTitle(`Command Information - ${command.name}`)
    embed.setDescription("<> means required, and [] means optional")
    embed.addField("Description: ", command.desc)
    embed.addField("Usage: ", serverprefix + command.name + " " + command.args)
    console.log(command)
    if(command.aliases.length > 0) embed.addField("Aliases: ", command.aliases.join(" "))
    if(command.reqPerm != "NONE") embed.addField("Required Permissions: ", command.reqPerm)
    if(command.example.length > 0) {
      var examples = ""
      command.example.forEach(example => {
        examples += ( serverprefix + command.name + " " + example + ", ")
      })
      examples.substring(0, examples.length-2)
      embed.addField('Examples', examples)
    }
    message.channel.send(embed)
  }
}

const getModuleFromPath = (filepath) => {
  const splited = filepath.split(path.sep)
  return splited[splited.length-2]
}
  