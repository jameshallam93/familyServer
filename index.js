const app = require("./app")
const http = require("http")
require ("dotenv").config()
const mongoose = require("mongoose")
const server = http.createServer(app)
const config = require("./utils/config")



server.listen(process.env.PORT || 3001, () =>{
    console.log(`listening on port ${process.env.PORT}`);
})