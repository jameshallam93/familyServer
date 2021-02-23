require ("dotenv").config()

const PORT = process.env.PORT

const URL = process.env.NODE_ENV === "testing" ?
    process.env.MONGO_TEST_DB_URL
    :
    process.env.MONGO_DB_URL

module.exports = {
    PORT,
    URL
}