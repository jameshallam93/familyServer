const loginRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

loginRouter.post("/", async (request, response) =>{
    const credentials = request.body

    const userToCheck = await User.findOne({"username": credentials.username}) 

    if (userToCheck === null){
        response.status(401).json({error:"username not found"})
        return
    }
    const passwordCorrect = !userToCheck?
    false
    :
    await bcrypt.compare(credentials.password, userToCheck.passwordHash)
    if (!passwordCorrect){
        response.status(401).json({error: "Incorrect password"})
        return
    }
    response.status(200).send({username: userToCheck.username})
})

module.exports = loginRouter