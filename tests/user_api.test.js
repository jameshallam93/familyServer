const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require("../app")
const User = require("../models/user")
const api = supertest(app)

//NOTE - username and password validation are done browser side - accordingly, the user api is expected to work even if the details provided are not valid
//may be worth including mongoose model validation server side

describe("given a username and password", ()=>{

    beforeEach(async ()=>{
        await User.deleteMany({})
    })
    const username = "username"
    const password = "password"

    test("returns status 200", async()=>{
        await api.post("/api/users")
            .send({username, password})
            .expect(200)
    })
    describe("and the object that is returned", ()=>{

        test("contains the submitted username", async ()=>{
            const response = await api.post("/api/users")
                .send({username, password})

            expect(response.body.username).toEqual(username)
        })
        test("and a newly created id", async ()=>{
            const response = await api.post("/api/users")
            .send({username, password})

            expect(response.body.id).toBeDefined()
        })
        test("but does not contain the submitted password OR a password hash", async ()=>{
            const response = await api.post("/api/users")
            .send({username, password})
            expect(response.body.password).not.toBeDefined()
            expect(response.body.passwordHash).not.toBeDefined()
        })
    })

})
afterAll(()=>{
    mongoose.disconnect()
})