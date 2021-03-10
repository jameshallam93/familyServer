const bcrypt = require("bcrypt")

const loginRouterHelper = {

    async comparePasswordWithHash (credentials, userToCheck){

        const truth = await bcrypt.compare(credentials.password, userToCheck.passwordHash)
        return truth
    },
    
    usernameNotFoundMessage :{error: "username not found"},
    incorrectPasswordMessage: {error: "password is incorrect"}

}

module.exports = loginRouterHelper