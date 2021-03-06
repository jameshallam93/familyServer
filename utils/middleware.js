const logger = require("./logger")

const requestLogger = (request, response, next) => {
    logger.info(request.body)
    logger.info(request.method)
    logger.info(request.path)
    logger.info("_____________")
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })

}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        response.status(400).send({ error: "malformatted id" })
    }
    if (error.name === "ValidationError") {
        response.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}