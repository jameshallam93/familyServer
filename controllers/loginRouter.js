const loginRouter = require("express").Router()
const User = require("../models/user")
const comparePasswordWithHash = require("../utils/auth/comparePasswordWithHash")




loginRouter.post("/", async (request, response) =>{
    const credentials = request.body

    const userToCheck = await User.findOne({"username": credentials.username}) 

    if (!userToCheck){
        response.status(401).json({ error: "username not found" })
        return
    }

    const passwordIsCorrect = await comparePasswordWithHash(credentials, userToCheck)

    if (!passwordIsCorrect){
        response.status(401).json({ error: "password is incorrect" })
        return
    }
    response.status(200).send({username: userToCheck.username})
})

module.exports = loginRouter
