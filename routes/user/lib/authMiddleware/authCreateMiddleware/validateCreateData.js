const {
    isEmpty,
    isAlpha,
    isAlphanumeric,
    isEmail,
    isStrongPassword,
} = require('validator');

function validateCreateData(req, res, next) {
    const {
        firstName,
        lastName,
        userName,
        email,
        password,
    } = req.body

    let errObj = {}

    if (!isAlpha(firstName)) {
        errObj.firstName = firstName = "First Name cannot have special characters"
    }
    if (!isAlpha(lastName)) {
        errObj.lastName = lastName = "Last Name cannot have pecial characters"
    }
    if (!isAlphanumeric(userName)) {
        errObj.userName = userName = "Username must not have special characters"
    }
    if (!isEmail(email)) {
        errObj.email = email = "Email must be in proper format and be valid"
    }
    if (!isStrongPassword(password)) {
        errObj.password = "Passwrod must have at least 1 special character, 1 upercase, 1lower case, 1 number and 8 caharacters long."
    }

    if (Object.keys(errObj).length > 0) {
        return res.json({
            message: "error - Handle It",
            error: errObj
        })
    } else {
        next()
    }
}
module.exports = {
    validateCreateData
}