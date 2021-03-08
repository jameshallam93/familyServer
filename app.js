const express = require("express")
const app = express()
const cors = require("cors")
const postRouter = require("./controllers/postRouter")
const userRouter = require("./controllers/userRouter")
const loginRouter = require("./controllers/loginRouter")
const mongoose = require("mongoose")
const config = require("./utils/config")
require("express-async-errors")

try {
    mongoose.connect(config.URL, {useCreateIndex:true, useFindAndModify: false, useUnifiedTopology:true, useNewUrlParser:true},()=>{
        console.log(`Connected to database ${config.URL}`)
    })
    
} catch (exception){
    console.log("error connecting to database")
}
app.use(express.json())
app.use(cors())
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

module.exports = app