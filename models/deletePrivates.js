
const deletePrivatesAndReturn = (document, returnedObject) =>{
    
    const newObject = {
        ...returnedObject,
        id:returnedObject._id
    }
    if (newObject.passwordHash){
        delete newObject.passwordHash
    }

    delete newObject._id
    delete newObject.__v
    return newObject
}

module.exports = {
    deletePrivatesAndReturn
}