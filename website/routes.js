const express = require("express")
const path = require("path")

var router = express.Router()

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/index.html"))
)

router.get("/authorize", async (req, res) => {

})

router.get("/adminlogin", async (req, res) => {
  
})

router.get("/backtoindex", async (req, res) => 
  res.sendFile(path.join(__dirname + "/index.html"))
)

router.get("/tocommandslist", async (req, res) => 
  res.sendFile(path.join(__dirname + "/commands.html"))
)
module.exports = router