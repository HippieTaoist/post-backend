var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

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



})

module.exports = router;