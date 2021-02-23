const postRouter = require("express").Router()
const Post = require("../models/post")
const {postRouterHelper:helper}  = require("./postRouterHelper")

postRouter.get("/", async (request, response, next) =>{

    const posts = await Post.find({})

    response.json(posts).status(200)
})

postRouter.get("/:id", async (request, response, next) =>{

  const id = request.params.id

  const post = await Post.findById(id)

  response.send(post).status(200)
})

postRouter.post("/", async (request, response, next) =>{

    const body = request.body
    
    const postToSave = helper.generateNewPost(body)

    const savedPost = await postToSave.save({new:true})
    
    response.send(savedPost).status(200)
  
})

postRouter.put("/:id", async (request, response, next) =>{
  const body = request.body
  const id = request.params.id

  const returnedPost = await Post.findByIdAndUpdate(id, body, {new:true})

  response.json(returnedPost.toJSON()).status(200)
})

module.exports = postRouter