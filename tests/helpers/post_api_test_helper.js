const Post = require("../../models/post")



const postApiTestHelper = {

    testPosts: [
        {
            content:"test post number 1",
            img: "https://images.freeimages.com/images/large-previews/754/details-of-a-tulip-2-1375972.jpg",
            likes: 0,
        },
        {
            content:"second test post",
            img:"https://www.rd.com/wp-content/uploads/2019/09/GettyImages-154917415.jpg",
            likes: 1
        }
    ],

    newPost: {
        content:"new post created within tests",
        img: "none",
        likes: 0
    },
    async postsFromDb () {
        const notes = await Post.find({})

        return notes
    },
    async initialiseDatabase () {
        await Post.deleteMany({})
        const postObjects = this.testPosts.map(post =>
            new Post(post))
        const promiseArray = postObjects.map(object =>
            object.save())
        await Promise.all(promiseArray)
    }
    
}

module.exports = {postApiTestHelper}