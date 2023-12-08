const express = require("express")
const https = require("https")
const app = express()

app.get("/", (req, res, next) => {
  https.request(new URL("https://rocketbotroyale.winterpixel.io" + req.path), (resp) => {
    res.contentType(resp.headers["content-type"])
    resp.pipe(res)
  }).end()
})
app.get("/discord", (req, res, next) => {
  https.request(new URL("https://discord.com" + req.path), (resp) => {
    res.contentType(resp.headers["content-type"])
    resp.pipe(res)
  }).end()
})

app.listen(3000)
