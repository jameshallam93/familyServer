const express = require("express")
const app = express()
const cors = require("cors")
const postRouter = require("./controllers/postRouter")
const userRouter = require("./controllers/userRouter")
const loginRouter = require("./controllers/loginRouter")
const mongoose = require("mongoose")
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

require("express-async-errors")

try {
    mongoose.connect(config.URL, {useCreateIndex:true, useFindAndModify: false, useUnifiedTopology:true, useNewUrlParser:true},()=>{
        logger.info(`Connected to database ${config.URL}`)
    })
    
} catch (exception){
    logger.error("error connecting to database")
}
app.use(express.json())
app.use(cors())
app.use(express.static("build"))
app.use(middleware.requestLogger)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app