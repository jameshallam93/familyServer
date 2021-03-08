const app = require("./app")
const http = require("http")
require ("dotenv").config()

const server = http.createServer(app)
const config = require("./utils/config")


const PORT = config.PORT
server.listen(PORT || 3001, () =>{
    console.log(`listening on port ${PORT}`);
})