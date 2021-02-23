const Post = require ("../models/post")


const postRouterHelper = {

    generateNewPost (body) {
        return new Post({
            content:body.content,
            img:body.img,
            likes:body.likes,
        })
    }
    
}

module.exports = {
    postRouterHelper
}