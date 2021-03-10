const loginRouter = require("express").Router()
const helper = require("./loginRouterHelper")
const User = require("../models/user")
const bcrypt = require("bcrypt")



loginRouter.post("/", async (request, response) =>{
    const credentials = request.body

    const userToCheck = await User.findOne({"username": credentials.username}) 

    if (!userToCheck){
        response.status(401).json(helper.usernameNotFoundMessage)
        return
    }

    const passwordIsCorrect = await helper.comparePasswordWithHash(credentials, userToCheck)

    if (!passwordIsCorrect){
        response.status(401).json(helper.incorrectPasswordMessage)
        return
    }
    response.status(200).send({username: userToCheck.username})
})

module.exports = loginRouter