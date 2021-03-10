const bcrypt = require("bcrypt")
const User = require("../../models/user")

const loginTestHelper = {

    async returnValidCreds () {
        const saltRounds = 10

        const password1 = "holdmybeer"
        const password2 = "aliensarereal"

        const hash1 = await bcrypt.hash(password1, saltRounds)
        const hash2 = await bcrypt.hash(password2, saltRounds)

        return([
            {
                username:"Littlebill",
                password:password1,
                passwordHash: hash1
            },
            {
                username:"Tomtugger",
                password: password2,
                passwordHash: hash2
            }
        ])
    },

    async initDatabase (validCreds) {

        const userObjects = validCreds.map(credentials =>
            new User({
                username: credentials.username,
                passwordHash: credentials.passwordHash
            })
        )
        const promiseArray = userObjects.map(user =>
                user.save()
        )
        await Promise.all(promiseArray)
    },
    credsWithWrongUsername : {
        username:"Philipbane",
        password:"doesntmatter"
    },
    credsWithWrongPassword: {
        username:"Littlebill",
        password:"nottodayzurg"
    }
    
}

module.exports = loginTestHelper