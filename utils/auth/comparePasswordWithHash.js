const bcrypt = require("bcrypt")

const comparePasswordWithHash = async (credentials, userToCheck) => {

    const truth = await bcrypt.compare(credentials.password, userToCheck.passwordHash)
    return truth
}

module.exports = comparePasswordWithHash