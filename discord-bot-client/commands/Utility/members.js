const { CanvasRenderService } = require('chartjs-node-canvas')
const { MessageAttachment, MessageEmbed, MessageEmbedImage } = require('discord.js')
const ChartJS = require('chart.js')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const width = 600
const height = 800

const chartCallback = (ChartJS) => {
  ChartJS.plugins.register({
    beforeDraw: (chartInstance) => {
      const { chart } = chartInstance
      const { ctx } = chart
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, chart.width, chart.height)
    }
  })
}

module.exports = {
  name: 'members',
  aliases: [],
  reqPerm: "NONE",
  args: "",
  cooldown: 5000,
  desc: "Shows a chart with member joins data.",
  example: [],
  run: async(client, message, args) => {
    const canvas = new CanvasRenderService(width, height, chartCallback)

    const membersData = await client.gData.get(`${message.guild.id}:members`)

    if(!membersData) return message.channel.send('I haven\'t gathered any data on this guild yet!')

    var totalmembers = []
    var members = []
    var bots = []
    var dates = []

    var data = Object.values(membersData)

    for(const item of data){
      members.push(item.members)
      totalmembers.push(item.totalmembers)
      bots.push(item.bots)
      dates.push(item.date)
    }
    

    const configuration = {
      type: 'line',

      borderCapStyle: 'round',
      lineTension: 0.4,

      data: {
        labels: dates,
        datasets: [
          {
            label: 'Total Members',
            backgroundColor: '#7289d9',
            borderColor: '#7289d9',
            showLine: true,
            fill: false,
            data: totalmembers,
          },
          {
            label: 'Members',
            backgroundColor: '#33cccc',
            borderColor: '#33cccc',
            showLine: true,
            fill: false,
            data: members,
          },
          {
            label: 'Bots',
            backgroundColor: '#9966ff',
            borderColor: '#9966ff',
            showLine: true,
            fill: false,
            data: bots,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: `${message.guild.toString()}`,
        },
      },
    }

    const image = await canvas.renderToBuffer(configuration)

    const attachment = new MessageAttachment(image)

    message.channel.send(attachment)
  }
}