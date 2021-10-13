const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var express = require('express');
var router = express.Router();


const errorHandler = require('../utils/errorHandler/errorHandler');
const User = require('./model/User');


/* GET users listing. */
router.get('/', async function (req, res) {
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


});

router.post('/create-user', async function (req, res) {
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
})

router.post('/login-user', async function (req, res) {
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


})

module.exports = router;