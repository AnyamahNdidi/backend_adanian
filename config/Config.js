const mongoose = require("mongoose")

const url = "mongodb://localhost/adainlab"

mongoose.connect(url).then(()=>{
  console.log("database connected")
})