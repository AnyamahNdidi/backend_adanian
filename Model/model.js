const mongoose = require("mongoose")
const bycrpt = require("bcrypt")

const user = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
  },
  id:{
    type:String,
  }
})


user.methods.matchPassword = async function(enterPassword){
  return await bycrpt.compare(enterPassword, this.password)
}

user.pre('save', async function(next){
  if(!this.isModified){
    next()
  }
  const salt = await bycrpt.genSalt(10)
  this.password = await bycrpt.hash(this.password, salt)
})

module.exports = mongoose.model("users", user)

