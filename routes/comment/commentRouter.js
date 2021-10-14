var express = require('express');
var router = express.Router();

const {
    jwtMiddleware,
} = require('../user/lib/authMiddleware/shared/jwtMiddleware')

const {
    fetchAllComments,
} = require('./controller/commentController')

router.get('/', jwtMiddleware, async function (req, res, next) {

    res.json({
        message: 'This is where you fetch Comments;',
        error: "Nothing wrong here",
    })
})

router.post('/create-comment', jwtMiddleware, async function (req, res, next) {

    res.json({
        message: "This is where you create Comments",
        error: "Nothing wrong here",
    })
})

router.put('/edit-comment-by-id/:id', jwtMiddleware, async function (req, res, next) {

    res.json({
        message: "'This is where you edit Comments;'",
        error: "Nothing wrong here",
    })
})

router.delete('/delete-comment-by-id/:id', jwtMiddleware, async function (req, res, next) {

    res.json({
        message: 'This is where you delete Comments;',
        error: "Nothing wrong here",
    })
})
module.exports = router;