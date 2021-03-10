const bcrypt = require("bcrypt")
const User = require("../models/user")

const userRouterHelper = {

    async generatePasswordHash (password) {
        const saltRounds = 10
        const hash = await bcrypt.hash(password, saltRounds)
        return hash
    },

    async generateUser (user) {

        const passwordHash = await this.generatePasswordHash(user.password)
        return new User ({
            username:user.username,
            passwordHash: passwordHash
        })
    }
}

module.exports = userRouterHelper