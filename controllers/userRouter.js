const userRouter = require("express").Router()
const User = require("../models/user")
const helper = require("./userRouterHelper")


userRouter.post("/", async (request, response) =>{
    
    const body = request.body
    const newUser = await helper.generateUser(body)

    const returnValue = await newUser.save()
    
    response.json(returnValue).status(200)

})
//not currently in use
userRouter.get("/:id", async (request, response) =>{
    const id = request.params.id

    const savedUserDetails = await User.findById(id)
    response.json(savedUserDetails)


})

module.exports = userRouter