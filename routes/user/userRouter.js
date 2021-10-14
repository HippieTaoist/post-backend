var express = require('express');
var router = express.Router();

const {
  checkIsUndefined,
  checkIsEmpty,
  validateCreateData,
  validateLoginData,
  jwtMiddleware
} = require("./lib/authMiddleware/index")

const {
  fetchAllUsers,
  updateUserById,
  loginUser,
  createUser,
  getUserProfile
} = require('./controller/userController')

/* GET users listing. */
router.get('/', jwtMiddleware, fetchAllUsers);

router.get('/profile', jwtMiddleware, getUserProfile);

router.post('/create-user', checkIsUndefined, checkIsEmpty, validateCreateData, createUser)

router.post('/login-user', checkIsUndefined, checkIsEmpty, validateLoginData, loginUser);

router.put('/update-user-by-id/:id', jwtMiddleware, updateUserById)

module.exports = router;