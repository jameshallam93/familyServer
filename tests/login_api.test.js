const App = require("../app")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const supertest = require("supertest")
const mongoose = require("mongoose")
const loginHelper = require("../controllers/loginRouterHelper")
const helper = require("./helpers/login_api_test_helper")
const api = supertest(App)




describe("when provided valid login details that are stored in the database", ()=>{
    //defined in tests to give easy access to credential properties
    let validCredentials;
    let credentialObject
    beforeEach(async ()=>{

        await User.deleteMany({})

        validCredentials = await helper.returnValidCreds()
        await helper.initDatabase(validCredentials)

        credentialObject = {
            username:validCredentials[0].username,
            password: validCredentials[0].password
        }
    })

    test("returns given username to frontend", async()=>{

        const response =
            await api.post("/api/login")
                .send(credentialObject)

        expect(response.body.username).toEqual(credentialObject.username)
    })
    
    test("returns status 200",async ()=>{

        await api.post("/api/login")
            .send(credentialObject)
            .expect(200)
    })
})

describe("when given an incorrect/unknown username", ()=>{

    let validCredentials;
    beforeEach(async ()=>{

        await User.deleteMany({})

        validCredentials = await helper.returnValidCreds()
        await helper.initDatabase(validCredentials)

    })

    test("returns status 401", async ()=>{

        await api.post("/api/login")
            .send(helper.credsWithWrongUsername)
            .expect(401)
    })
    test("with username not found error message",async ()=>{

        const response = await api.post("/api/login")
            .send(helper.credsWithWrongUsername)

        const error = response.body
        expect(error).toEqual(loginHelper.usernameNotFoundMessage)
    })
})

describe("when given a correct username with an incorrect password", ()=>{

    let validCredentials;
    beforeEach(async ()=>{

        await User.deleteMany({})

        validCredentials = await helper.returnValidCreds()
        await helper.initDatabase(validCredentials)

    })
    test("returns status 401", async ()=>{

        await api.post("/api/login")
            .send(helper.credsWithWrongPassword)
            .expect(401)
    })
    test("with incorrect password error message", async()=>{
        
        const response = await api.post("/api/login")
            .send(helper.credsWithWrongPassword)

        const error = response.body
        expect(error).toEqual(loginHelper.incorrectPasswordMessage)
    })
})

afterAll(()=>{
    mongoose.disconnect()
})

