const walkSync = require('../../walkSync.js')

const subcommands = walkSync('./commands/invites/subcommands')

module.exports = {
  name: 'invites',
  aliases: [],
  reqPerms: [],
  run: async (Discord, client, message, args) => {
    const subcmd = args[0]

    if(!subcmd) return listCommands(message)

    for (const file of subcommands) {
      const subcommand = require(`../../${file}`);
      if (subcmd == subcommand.name) {
        if(subcommand.reqPerms.length > 0 && !message.member.hasPermission(subcommand.reqPerms)) return message.channel.send(`You need \`${subcommand.reqPerms.join("``")}\` perms to run this command.`)

        return subcommand.run(client, message, args)
      }
    }

    listCommands(message)
  }
}

function listCommands(message){
  message.channel.send("Please choose one of the following. \n`user` \n`list` \n`revoke`")
}
