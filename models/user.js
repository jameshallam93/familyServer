const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const modelHelper = require("./modelHelper")


const userSchema = mongoose.Schema({
    username:{
        required: true,
        type: String,
        unique: true
    },
    passwordHash:{
        type: String,
        required:true
    },
    id:{
        type: mongoose.Schema.Types.ObjectId
    }

})
userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
transform: modelHelper.deletePrivatesAndReturn})

userModel = mongoose.model("user", userSchema)

module.exports = userModel