const jwt = require("jsonwebtoken")

const generateToken = (user) =>{
    return jwt.sign(user, "adanaian", {
      expiresIn:"1d"
    })
}

module.exports = {
  generateToken
}