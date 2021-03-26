const app = require("./app")
const config = require("./utils/config")
const logger = require("./utils/logger")

const http = require("http")
require("dotenv").config()
const server = http.createServer(app)

const PORT = config.PORT
server.listen(PORT || 3001, () => {
    logger.info(`listening on port ${PORT}`);
})