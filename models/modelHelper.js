const mongoose = require("mongoose")

const deletePrivatesAndReturn = (document, returnedObject) =>{
    
    if (returnedObject.passwordHash){
    delete returnedObject.passwordHash
    }
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
}

module.exports = {
    deletePrivatesAndReturn
}