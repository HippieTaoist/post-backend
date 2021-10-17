var express = require('express');
var router = express.Router();

let Comment = require("./model/Comment")
let Post = require('../post/model/Post');
let User = require("../user/model/User")

const jwt = require('jsonwebtoken')

const {
    jwtMiddleware,
} = require('../user/lib/authMiddleware/shared/jwtMiddleware')

const {
    fetchAllComments,
    createComment,
    editComment
} = require('./controller/commentController');


router.get('/fetch-all-comments', jwtMiddleware, fetchAllComments)

router.post('/create-comment', jwtMiddleware, createComment)


router.put('/edit-comment-by-id/:id', jwtMiddleware, editComment)

router.delete('/delete-comment-by-id/:id', jwtMiddleware, async function (req, res, next) {

    res.json({
        message: 'This is where you delete Comments;',
        error: "Nothing wrong here",
    })
})


module.exports = router;