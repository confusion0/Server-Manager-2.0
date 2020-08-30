const express = require("express")
const path = require("path")

var router = express.Router()

router.get("/", (req, res) =>
    res.sendFile(path.join(__dirname + "/index.html"))
)

router.get("/authorize", (request, response) => {
    
})

module.exports = router