require("./config/Config")
const express = require("express")
const app = express()
const myRouter = require("./Router/router")
const port = 7000

app.use(express.json())
app.use("/", myRouter)

app.listen(port, ()=>{
  console.log(`port is up and running`)
})