const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const Axios = require('axios')

module.exports = {
  name: 'discordbotlist_upvoted',
  run: async(client) => {
    async function updateDBL(guilds, users) {
      // Update the server and member count on discordbotlist.com
      const DBL = `https://discordbotlist.com/api/v1/bots/${process.env.CLIENTID}/stats`
      const BODY = { users, guilds }
      const HEADERS = { "Authorization": "TOKEN" }
      return await Axios.post(DBL, BODY, {headers: HEADERS})
    }

    setInterval(updateDBL, 1800000);
  }
}