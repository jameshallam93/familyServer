const mongoose = require("mongoose")
const deletePrivates = require("./deletePrivates")

const postSchema = mongoose.Schema({
    content: String,
    img: String,
    likes: Number,
    id: mongoose.Schema.Types.ObjectId
})

postSchema.set("toJSON", {
    transform: deletePrivates.deletePrivatesAndReturn
})

module.exports = mongoose.model("Post", postSchema)
