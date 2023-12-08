const express = require("express")
const https = require("https")
const app = express()


app.get("/rocket/*", (req, res, next) => {
  const pathSegments = req.path.split('/');
  const rocketPath = pathSegments[2]
  https.request(new URL("https://rocketbotroyale.winterpixel.io/" + rocketPath), (resp) => {
    res.contentType(resp.headers["content-type"])
    resp.pipe(res)
  }).end()
})
app.get("/*", (req, res, next) => {
  https.request(new URL("https://discord.com/" + req.path), (resp) => {
    res.contentType(resp.headers["content-type"])
    resp.pipe(res)
  }).end()
})


app.listen(3000)
