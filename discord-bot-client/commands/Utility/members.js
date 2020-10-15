const { CanvasRenderService } = require('chartjs-node-canvas')
const { MessageAttachment } = require('discord.js')
const ChartJS = require('chart.js')

const width = 600
const height = 800

const chartCallback = (ChartJS) => {}

module.exports = {
  name: 'members',
  aliases: [],
  reqPerm: "MANAGE_GUILD",
  args: "",
  cooldown: 5000,
  desc: "Shows a chart with member joins data.",
  example: [],
  run: async(client, message, args) => {
    const canvas = new CanvasRenderService(width, height, chartCallback)

    const membersData = await client.gData.get('members')

    const guildMembersData = membersData[message.guild.id]

    if(!guildMembersData) return message.channel.send('I haven\'t gathered any data on this guild yet!')

    var members = []
    var dates = []

    const data = Object.values(guildMembersData)

    for(const item of data){
      members.push(item.members)
      dates.push(item.date)
    }
    

    const configuration = {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Discord Members',
            data: members,
            backgroundColor: '#7289d9',
          }
        ],
      },
    }

    const image = await canvas.renderToBuffer(configuration)

    const attachment = new MessageAttachment(image)

    message.channel.send(attachment)
  }
}
