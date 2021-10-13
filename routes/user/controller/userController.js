const User = require("../model/User")

const bcrypt = require("bcryptjs")
const {
    isEmpty,
    isAlpha,
    isAlphanumeric,
    isEmail,
    isStrongPassword,
} = require("validator")





async function createUser(req, res) {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
    } = req.body

    try {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = new User({

            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
        })
        let savedUser = await createdUser.save();
        res.json({
            message: "Successfully created user",
            payload: savedUser,
        })
    } catch (err) {
        res
            .status(500)
            .json({
                message: "error creating user",
                error: errorHandler(err)
            })
    }
}


async function loginUser(req, res) {
    const {
        email,
        password
    } = req.body;

    try {

        let foundUser = await User
            .findOne({
                email: email,
            })

        if (!foundUser) {
            return res.status(500).json({
                message: "error logging in user",
                error: "Please go sign up"
            })
        } else {
            let comparedPassword = await bcrypt.compare(password, foundUser.password);

            if (!comparedPassword) {
                return res.status(500).json({
                    message: "error",
                    error: "Please check email and password"
                })
            } else {
                let jwtToken = jwt
                    .sign({
                        email: foundUser.email,
                        username: foundUser.username,
                    }, process.env.SECRET_KEY, {
                        expiresIn: "24h"
                    })

                return res.json({
                    message: "Successfully Logged In",
                    payload: jwtToken,
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "error",
            error: err.message,
        })
    }
}

async function updateUserById(req, res) {

    try {

        const {
            password
        } = req.body

        const decodedData = res.locals.decodedData
        console.log("Line XXX - decodedData -", decodedData)
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        req.body.password = hashedPassword;

        let updatedUser = await User.findOneAndUpdate({
            email: decodedData.email
        }, req.body, {
            new: true
        })

        res.json({
            message: "Sucessfully updated",
            payload: updatedUser
        })
    } catch (err) {
        res.status(500).json({
            message: "error",
            error: err.message
        })
    }

}

module.exports = {
    createUser,
    loginUser,
    updateUserById,
}