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

    var data = Object.values(guildMembersData)
    // if(args[0] == 'test'){
    //   data = [
    //     { date: '10/14/2020', members: 1002 },
    //     { date: '10/15/2020', members: 2022 },
    //     { date: '10/16/2020', members: 3455 },
    //     { date: '10/17/2020', members: 4937 },
    //     { date: '10/18/2020', members: 6535 },
    //     { date: '10/19/2020', members: 9243 },
    //     { date: '10/20/2020', members: 12312 }
    //   ]
    // }

    for(const item of data){
      members.push(item.members)
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
            label: 'Members',
            backgroundColor: '#7289d9',
            borderColor: '#7289d9',
            showLine: true,
            fill: false,
            data: members,
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

    // const embed = new MessageEmbed()
    // .setTitle(":family: Members")
    // .setDescription("Total: " + message.guild.memberCount)

    // message.channel.send(embed)

    message.channel.send(attachment)
  }
}