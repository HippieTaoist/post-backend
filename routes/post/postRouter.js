var express = require('express');
var jwt = require('jsonwebtoken');

const Post = require('./model/Post');
const User = require('../user/model/User');

var router = express.Router();
const {
    jwtMiddleware
} = require("../user/lib/authMiddleware/index")

const {
    fetchPosts,
    createPost,
    editPostById,
    deletePostById,
} = require("./controller/postController")


router.get('/fetch-posts', jwtMiddleware, fetchPosts);

router.post('/create-post', createPost);

router.put('/edit-post-by-id/:id', jwtMiddleware, editPostById);

router.delete('/delete-post-by-id/:id', jwtMiddleware, deletePostById);

module.exports = router