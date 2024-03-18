const express = require("express")
const https = require("https")
const app = express()

app.get("/*", (req, res, next) => {
  //const pathSegments = req.path.split('/');
 // const rocketPath = pathSegments[2]
  https.request(new URL("https://shellshock.io/" + req.path), (resp) => {
    res.contentType(resp.headers["content-type"])
    resp.pipe(res)
  }).end()
})


app.listen(3000)
