const userRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

const generateUser = async (user) =>{
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(user.password, saltRounds)
    return new User ({
        username:user.username,
        passwordHash: passwordHash,
        id: user.id
    })
}
userRouter.post("/", async (request, response) =>{
    
    const body = request.body
    const newUser = await generateUser(body)

    const returnValue = await newUser.save()
    response.json(returnValue).status(200)

})

userRouter.get("/:id", async (request, response) =>{
    const id = request.params.id

    const savedUserDetails = await User.findById(id)
    response.json(savedUserDetails)


})

module.exports = userRouter