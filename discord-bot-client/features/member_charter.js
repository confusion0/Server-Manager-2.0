const schedule = require('node-schedule')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
  name: 'member_charter',
  run: async(client) => {
    await sleep(1000)

    updateMembersChart()

    setInterval(updateMembersChart, 2100000)

    async function updateMembersChart(){
      client.guilds.cache.forEach(async guild => {
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate()

        var members = await client.gData.get(`${guild.id}:members`) || {}

        if(!members[formatted_date]) members[formatted_date] = {}

        members[formatted_date].date = formatted_date
        members[formatted_date].totalmembers = guild.memberCount
        members[formatted_date].members = getMembersWithoutBots(guild)
        members[formatted_date].bots = getBots(guild)

        await client.gData.set(`${guild.id}:members`, members)
      })
    }
  }
}

function getMembersWithoutBots(guild){
  var members = 0;
  guild.members.cache.forEach(member => {
    if(!isbot(member.user)) members++;
  })
  return members
}

function getBots(guild){
  var members = 0;
  guild.members.cache.forEach(member => {
    if(isbot(member.user)) members++;
  })
  return members
}

function isbot(user){
  if(user.bot) return true
  return false
}