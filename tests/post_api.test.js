const app = require("../app")
const supertest = require("supertest")
const mongoose = require("mongoose")
const Post = require("../models/post")
const { postApiTestHelper:helper } = require("./helpers/post_api_test_helper")
const { testPosts } = require

const api = supertest(app)




beforeEach(async ()=>{
    await helper.initialiseDatabase()
})

describe("after initialisation: ", () =>{

    describe("when fetching all posts ", ()=>{

        test("database contains two documents", async ()=>{

            const response = await api.get("/api/posts")
            expect(response.body).toHaveLength(2)
        })
        test("documents are returned from the database with status 200", async () =>{

            await api.get("/api/posts")
            .expect(200)
        })
        test("documents returned from the database are in JSON format", async()=>{

            await api.get("/api/posts")
            .expect("Content-Type", /application\/json/)
        })
        test("returned documents contains specific post", async () =>{

            const noteToBeReturned = helper.testPosts[0]

            const response = await api.get("/api/posts")
            const posts = response.body.map(response =>{
                return response.content})

            expect(posts).toContain(noteToBeReturned.content)
        })
    })
    
    describe("when fetching individual posts ", ()=>{

        let testPost;
        let id;
        
        beforeEach(async ()=>{
            testPost =  await Post.findOne({content: "test post number 1"})
            id = testPost._id
        })
        //this test proved tricky to write - works on assumption that multiple posts would be returned as array, not object. Sketchy.
        test("only one post is returned", async() =>{

            const result = await api.get(`/api/posts/${id}`)

            expect(typeof result.body).toEqual("object")
        })
        test("post is returned in json format", async() =>{

            await api.get(`/api/posts/${id}`)
                .expect("Content-Type", /application\/json/)
        })
        test("post is returned with status 200", async () =>{
            
            await api.get(`/api/posts/${id}`)
                .expect(200)
        })
        test("all expected variables are defined", async ()=>{

            const result = await api.get(`/api/posts/${id}`)

            expect(result.body.content).toBeDefined()
            expect(result.body.img).toBeDefined()
            expect(result.body.likes).toBeDefined()
            expect(result.body.id).toBeDefined()
        })

    })
    describe("when posting a new post: ",()=>{

        test("post is created successfully", async() =>{
            const postsAtStart = await helper.postsFromDb()

            await api.post("/api/posts")
            .send(helper.newPost)

            const postsAtEnd = await helper.postsFromDb()
            expect(postsAtEnd).toHaveLength(postsAtStart.length + 1)
        })
        test("and returns status 200", async () =>{
            await api.post("/api/posts")
                .send(helper.newPost)
                .expect(200)
        })
        test("all post variables are created correctly", async() =>{
       
            const response = await api.post("/api/posts")
            .send(helper.newPost)

            const {content, img, likes} = helper.newPost
            const {content:newContent, img:newImg, likes:newLikes, id:id} = response.body
            
            expect(newContent).toEqual(content)
            expect(newImg).toEqual(img)
            expect(newLikes).toEqual(likes)
        })
    })

    describe("when updating likes of a post: ", ()=>{
        let postToUpdate;
        let updatedPost;
        beforeEach(async ()=>{
            const postsAtStart = await helper.postsFromDb()

             postToUpdate = postsAtStart[0]
            
             updatedPost = helper.incrementLikes(postToUpdate)

        })
        test("the api returns the updated post", async ()=>{
            
            const response = await api.put(`/api/posts/${updatedPost.id}`)
                .send(updatedPost)

            const result = response.body

            expect(result.likes).toEqual(postToUpdate.likes + 1)

        })
        test("in appropriate json format", async () =>{
            await api.put(`/api/posts/${updatedPost.id}`)
                .expect("Content-Type", /application\/json/)
        })

        test("and with status 200", async ()=>{
            
            await api.put(`/api/posts/${updatedPost.id}`)
                .send(updatedPost)
                .expect(200)
        })
        test("the updated post can then be accessed through the apis get function", async ()=>{
            await api.put(`/api/posts/${updatedPost.id}`)
                .send(updatedPost)
            
            const response = await api.get(`/api/posts/${updatedPost.id}`)

            expect(response.body.likes).toEqual(updatedPost.likes)
        })
    })
})


afterAll(()=>{
    mongoose.connection.close()
})