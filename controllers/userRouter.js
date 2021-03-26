const userRouter = require("express").Router()
const User = require("../models/user")
const generatePasswordHash = require("../utils/auth/generatePasswordHash")

userRouter.post("/", async (request, response) => {

    const user = request.body

    const passwordHash = await generatePasswordHash(user.password)
    const newUser = new User({
        username: user.username,
        passwordHash: passwordHash
    })

    const returnValue = await newUser.save()

    response.json(returnValue).status(200)

})
//not currently in use
userRouter.get("/:id", async (request, response) => {

    const id = request.params.id

    const savedUserDetails = await User.findById(id)
    response.json(savedUserDetails)

})

module.exports = userRouter