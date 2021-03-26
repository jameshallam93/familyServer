const postRouter = require("express").Router()
const Post = require("../models/post")

postRouter.get("/", async (request, response, next) => {

    const posts = await Post.find({})
    posts.reverse()

    response.json(posts).status(200)
})

postRouter.get("/:id", async (request, response, next) => {

    const id = request.params.id

    const post = await Post.findById(id)

    response.json(post).status(200)
})

postRouter.post("/", async (request, response, next) => {

    const body = request.body

    const postToSave = new Post({
        content: body.content,
        img: body.img,
        likes: body.likes,
    })

    const savedPost = await postToSave.save({ new: true })

    response.send(savedPost).status(200)
})

postRouter.put("/:id", async (request, response, next) => {
    const body = request.body
    const id = request.params.id

    const returnedPost = await Post.findByIdAndUpdate(id, body, { new: true })

    response.json(returnedPost).status(200)
})

module.exports = postRouter