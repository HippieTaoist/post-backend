const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const {
    isEmpty,
    isAlpha,
    isAlphanumeric,
    isEmail,
    isStrongPassword,
} = require("validator")

const User = require("../model/User")

async function fetchAllUsers(req, res) {
    try {
        let payload = await User.find(req.body);

        res.json({
            message: "Successfully Fetched Users",
            payload: payload,
        })

    } catch (err) {
        res
            .status(500).json({
                message: "Error fetching Users",
                error: err.message
            })
    }


}

async function createUser(req, res) {
    const {
        firstName,
        lastName,
        userName,
        email,
        password,
    } = req.body

    try {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = new User({

            firstName,
            lastName,
            userName,
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
                        userName: foundUser.userName,
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
            message: "Login Error",
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
            message: "Error updating user",
            error: err.message
        })
    }

}

async function getUserProfile(req, res) {
    try {

        let decodedToken = jet.decode(req.body.token, process.env.SECRET_KEY);

        res.json({
            token: decodedToken
        })

    } catch (err) {
        res.status(500).json({
            message: "error",
            error: err.message
        })


    }
}

module.exports = {
    fetchAllUsers,
    createUser,
    loginUser,
    updateUserById,
    getUserProfile
}