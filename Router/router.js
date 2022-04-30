const express = require("express")

const router  = express.Router()

const {Register, LoginUser, verify, getAlll,getOne} = require("../Controller/controller")

router.post("/register", Register)
router.post("/login", LoginUser)
router.get("/", verify, getAlll )
router.get("/user/:id", verify, getOne)


module.exports= router