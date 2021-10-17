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
    createComment
} = require('./controller/commentController');


router.get('/fetch-all-comments', jwtMiddleware, fetchAllComments)

router.post('/create-comment', jwtMiddleware, createComment)


router.put('/edit-comment-by-id/:id', jwtMiddleware, async function (req, res, next) {
    const {
        commentContext,
    } = req.body

    try {

        let editedComment = await Comment.findByIdAndUpdate(req.params.id)

        if (!editedComment) {
            return res.status(404).json({
                message: "No comments found for that ID."
            })
        }

        const decodedData = res.locals.decodedData;
        let foundUser = await User.findOne({
            email: decodedData.email,
        })

        if (!foundUser) {
            return res.status(404).json({
                message: "User not found.",
                error: "User not found."
            })
        } else {
            editedComment.commentContext = commentContext
        }

        let savedComment = await editedComment.save()
        res.json({
            message: "'This is where you edit Comments;'",
            payload: savedComment
        })

    } catch (err) {
        res.status(500).json({
            message: "Error in editing Comment: See Below for more information",
            error: err.message
        })
    }


})

router.delete('/delete-comment-by-id/:id', jwtMiddleware, async function (req, res, next) {

    res.json({
        message: 'This is where you delete Comments;',
        error: "Nothing wrong here",
    })
})


module.exports = router;