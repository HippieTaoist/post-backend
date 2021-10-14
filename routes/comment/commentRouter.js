var express = require('express');
var router = express.Router();

let Comment = require("./model/Comment")

const {
    jwtMiddleware,
} = require('../user/lib/authMiddleware/shared/jwtMiddleware')

const {
    fetchAllComments,
} = require('./controller/commentController')

router.get('/fetch-all-comments', jwtMiddleware, async function (req, res, next) {

    try {
        let payload = await Comment.find(req.body)






        res.json({
            message: 'This is where you fetch Comments;',
            payload: payload,
        })
    } catch (err) {
        res.status(500).json({
            message: "Trouble Fetching Comments",
            error: err.message
        })
    }


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