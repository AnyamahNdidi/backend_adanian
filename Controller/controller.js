const userData = require("../Model/model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {generateToken} = require("../config/generateToken")


const verify = async(req, res, next) =>{
  try{
    const authCheck = await req.headers.authorization

    if(authCheck){
      const token  =  await authCheck
     
      jwt.verify(token, "adanaian", (error, payload)=>{
          if(error){
            res.status(400).json({message : `error found ${error.message}`})
          }else{
            req.user= payload
            next()
          }
      })
    }else{
      res.status(500).json({message :"token needed"})
    }
  }catch(error){
    res.status(400).json({message: error.message})
  }
}



const Register = async (req,res) =>{
  try{

    const {name, password, email, ownId} = req.body
    const checkEmail = await userData.findOne({email:req.body.email})
    if(checkEmail){
       return  res.status(401).json({msg:"user already register"})
    }
   

    const CreateUser = await userData.create({
      name,
      email,
      password,
      id:Math.random() * 100 
     
    })
    res.status(200).json({msg:"user created",data: CreateUser})
  }catch(err){
    res.status(400).json({msg:"error creating user",data:err.message})
  }
}


const LoginUser = async (req, res)=>{

  try{
    const { email, password}= req.body
    
    const user = await userData.findOne({email})
    if(user){

      const checkPassword = await user.matchPassword(req.body.password, user.password)
      if(checkPassword){
        const {password, ...info} = user._doc
        const token = generateToken({
          id:user._id,
          email:user.email,
          name:user.email
        })

        res.status(200).json({
          message :`welcome back ${user.name}`,
          data:{...info, token}
        })

      }else{
        res.status(400).json({message:"password is incorrect"})
      }

    }else{
      res.status(400).json({message :"Email doesnt exist"})
    }

  }catch(error){
    res.status(400).json({message : error.message})
  }
  // const {email, password} = req.body
}

const getAlll = async(req, res) =>{
  try{
    if(req.user){
    const data = await userData.find()

  res.status(200).json({
    msg: "all data found successfully",
    data: data
  })
    }
   
  }catch(err){
    res.status(500).json({
      msg: err.message
    })
  }
}
const getOne = async(req, res) =>{
  try{
   
     if(req.user){
    const {id} = req.params
    const data = await userData.findById(id)
  res.status(200).json({
    msg: "user profile found",
    data: data
  })
     }
   
  }catch(err){
    res.status(500).json({
      msg: err.message
    })
  }
}


module.exports = {
  Register,
  LoginUser,
  verify,
  getAlll,
  getOne
}


