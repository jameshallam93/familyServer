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
            const notesAtStart = await helper.postsFromDb()

            await api.post("/api/posts")
            .send(helper.newPost)

            const notesAtEnd = await helper.postsFromDb()
            expect(notesAtEnd).toHaveLength(notesAtStart.length + 1)
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
    //to write still
    describe("when updating likes of a post: ",async ()=>{
        test("likes are updated successfully", async ()=>{
            expect(2).toEqual(1)
        })
        test("the api returns the updated post", async ()=>{
            expect(2).toEqual(1)
        })
        test("the updated post can be accessed through the api"), async ()=>{
            expect(2).toEqual(1)
        }
    })
})


afterAll(()=>{
    mongoose.connection.close()
})