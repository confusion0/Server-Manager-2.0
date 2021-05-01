const MindustrySchematicParsingSchema = require('../schemas/AntiAd.js')
const { Schematic } = require('mindustry-schematic-parser')
const { MessageEmbed, MessageAttachment } = require('discord.js')

const itemEmojis = [
  { name: "copper", id: "837416257207664701" },
  { name: "lead", id: "837416257317634109" },
  { name: "phase-fabric", id: "837416257376616459" },
  { name: "spore-pod", id: "837416257379762277" },
  { name: "pyratite", id: "837416257439268915" },
  { name: "thorium", id: "837416257476624405" },
  { name: "blast-compound", id: "837416257509654569" },
  { name: "titanium", id: "837416257536000010" },
  { name: "oil", id: "837416257556185158" },
  { name: "surge-alloy", id: "837416257556447273" },
  { name: "water", id: "837416257556971610" },
  { name: "slag", id: "837416257560772618" },
  { name: "silicon", id: "837416257560772688" },
  { name: "cryofluid", id: "837416257564573726" },
  { name: "plastanium", id: "837416257569030154" },
  { name: "graphite", id: "837416257581875290" },
  { name: "coal", id: "837416257614643210" },
  { name: "scrap", id: "837416257623556136" },
  { name: "metaglass", id: "837416257653440552" },
  { name: "sand", id: "837416257678606366" }
]

module.exports = {
  name: "schematic",
  run: async(client, message) => {
    const enabled = await MindustrySchematicParsingSchema.get(message.guild.id)
    if(!enabled) return false;

    var parsed = false;
    if(message.attachments){
      message.attachments.forEach(async a => {
        fetch(a.url)
          .then(res => res.buffer())
          .then(buffer => {
            if(isValidSchematic(buffer.toString('base64'))){
              generateSchematicEmbed(buffer.toString('base64'))
                .then(embed => embed ? message.channel.send(embed) : "" )
              message.delete()
            }
          })
      })
    }
    
    if(isValidSchematic(message.content)){
      generateSchematicEmbed(message.content)
        .then(embed => embed ? message.channel.send(embed) : "" )
      message.delete()
    }

    if(parsed) message.delete()

    return parsed;

    async function generateSchematicEmbed(base64Code){
      const schematic = decodeSchematic(base64Code)
      if(!schematic) return null;
      
      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle(schematic.name)
        .setFooter(schematic.description)
        
      var requirementsString = ""
      const requirements = schematic.requirements
      for(itemName in requirements){
        var itemAmount = requirements[itemName]
        var itemEmoji = itemEmojis.find(e => e.name == itemName)
        if(itemEmoji){
          var emoji;
          if(itemEmoji.emoji) emoji = itemEmoji.emoji
          else {
            const fetchedEmoji = client.emojis.cache.get(itemEmoji.id)
            itemEmoji.emoji = fetchedEmoji
            emoji = fetchedEmoji
          }
        
          requirementsString += `${emoji}${itemAmount} `
        } else {
          requirementsString += ` ${itemAmount} ${itemName},`
        }
      }
      embed.addField('Requirements', requirementsString.slice(0, requirementsString.length-1))
      
      const schematicBuffer = Buffer.from(base64Code, 'base64')
      const schematicAttachment = new MessageAttachment(schematicBuffer, `${schematic.name}.msch`)
        
      const imageBuffer = await schematic.toImageBuffer()
      const attachment = new MessageAttachment(imageBuffer, 'schematic.png')

      embed.attachFiles([attachment, schematicAttachment])
      embed.setImage('attachment://schematic.png')
      
      return embed;
    }
  }
}

function decodeSchematic(base64Code){
  try {
    return Schematic.decode(base64Code);
  } catch (error) {
    console.log(error)
    return null;
  }
} 

function isValidSchematic(base64Code) {
  try {
    const buffer = Buffer.from(base64Code, 'base64')
    const decoded = buffer.toString();
    const header = 'msch';
    // the startsWith method doesn't work
    for (let i = 0; i < header.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (header[i] != decoded[i]) return false;
    }
    return true;
  } catch {
    return false;
  }
}