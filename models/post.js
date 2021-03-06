const mongoose = require("mongoose")
const modelHelper = require("./modelHelper")

const postSchema = mongoose.Schema({
    content:String,
    img:String,
    likes:Number,
    id: mongoose.Schema.Types.ObjectId
})

postSchema.set("toJSON", {
    transform: modelHelper.deletePrivatesAndReturn
})

module.exports = mongoose.model("Post", postSchema)
