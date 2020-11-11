const { MessageEmbed } = require('discord.js')
const ms = require("ms")

const keyPermissions = [
  'ADMINISTRATOR',
  'CREATE_INSTANT_INVITE',
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'MANAGE_GUILD',
  'MENTION_EVERYONE',
  'MANAGE_NICKNAMES',
  'MANAGE_CHANNELS',
  'MANAGE_ROLES',
  'MANAGE_WEBHOOKS',
  'MANAGE_EMOJIS',
]

var flagsDictionary = {
    DISCORD_EMPLOYEE: '<:discord_staff:774836263081607238> Discord Employee',
    PARTNERED_SERVER_OWNER: '<:discord_partner:774836262766641214> Discord Partner',
    BUGHUNTER_LEVEL_1: '<:bug_hunter_lvl1:774836262942670908> Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: '<:bug_hunter_lvl2:774836263156449280> Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: '<:hypesquad_events:774836262762053653> HypeSquad Events',
    HOUSE_BRAVERY: '<:bravery:774836262996934656> House of Bravery',
    HOUSE_BRILLIANCE: '<:brilliance:774836262762446859> House of Brilliance',
    HOUSE_BALANCE: '<:balance:774836262774374401> House of Balance',
    EARLY_SUPPORTER: '<:early_supporter:774836262439092255> Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    EARLY_VERIFIED_BOT_DEVELOPER: '<:Dev:765259202464579606> Early Verified Bot Developer',
};

module.exports = {
  name: 'whois',
  aliases: [],
  reqPerm: "NONE",
  args: "[mention]",
  cooldown: 1000,
  module: "General",
  desc: "Displays useful information on a user.",
  example: ['@!!NoobMan13!!', '@Commander786'],
  run: async(client, message, args) => {
    let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.member(message.author))
    let user = rMember.user
    if(!user) return message.channel.send("Please enter the user as a mention. Ex: @Example")
    let guild = message.guild

    let createdAt = (user.createdAt).toString().slice(0, 15)
    let joinedAt = (rMember.joinedAt).toString().slice(0, 15)
    var createdAgo = ms(Math.abs(new Date() - user.createdAt),{long:true})
    var joinedAgo = ms(Math.abs(new Date() - rMember.joinedAt),{long:true})
    let roleAmount = rMember.roles.cache.size - 1
    let id = user.id

    let roles = ""
    rMember.roles.cache.forEach(role => {
      if(role.toString() != "@everyone") roles += role.toString() + " "
    })
    if(!roles) roles = "No roles"
    if(roles.length > 1024) roles = roleAmount + " roles"

    var permissionString = ''
    var permissions = rMember.permissions.serialize()
    permissions = Object.entries(permissions)

    for(permission of permissions){
      if(permission[1] && keyPermissions.includes(permission[0])) permissionString = `${permissionString}\`${permission[0]}\`, `
    }
    if(permissionString.length > 0) permissionString = permissionString.slice(0, -2)

    let userStatus = user.presence.status
    if(userStatus === "offline") userStatus = "⚫ Offline"
    if(userStatus === "dnd") userStatus = "⛔ Do Not Disturb"
    if(userStatus === "online") userStatus = ":green_circle: Online"

    let flags = (await user.fetchFlags()).serialize()
    flags = Object.entries(flags)
    let flagsString = ''
    let flagsAmount = 0

    for(flag of flags){
      if(flag[1] === true) {
        flagsString += (flagsDictionary[flag[0]] + '  ')
        flagsAmount += 1
      }
    }

    if(flagsString < 1) flagsString = 'No Badges'

    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(rMember.user)
    .setAuthor(user.tag, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addField(`Registered: `, `${createdAt} (${createdAgo} ago)`, true)
    .addField(`Joined: `, `${joinedAt} (${joinedAgo} ago)`, true)
    .addField(`Status: `, userStatus)
    .addField(`Badges[${flagsAmount}]: `, flagsString)
    .addField(`Roles[${roleAmount}]: `, roles)
    .addField('Key Permissions', permissionString)
    .setFooter(`ID: ${id}`)
    .setTimestamp()
    message.channel.send(embed)
  }
}
