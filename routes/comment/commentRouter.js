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


    const decodedData = res.locals.decodedData
    let foundUser = await User.findOne({
        email: decodedData.email,
    })


    let deletedComment = await Comment.findByIdAndDelete(req.params.id)

    if (!deletedComment) {
        return res.status(404).json({
            message: "No comment with that ID to delete",
        })
    }

    let postCommentedOn = deletedComment.postCommentedOn
    let commentOwner = deletedComment.commentOwner

    console.log("Line XXX - commentOwner, decodedData._id, decodedData.id -", typeof (commentOwner), decodedData, typeof (foundUser._id))

    if (foundUser._id !== commentOwner) {
        return res.status(500).json({
            message: "You do not have permission to delete",
            error: "Only the comment owner may delete comments"
        })
    }


    let userCommentHistoryArray = foundUser.commentHistory
    let filteredUserCommentHistoryArray = userCommentHistoryArray.filter((item) => item.id.toString() !== req.params.id)
    foundUser.postHistory = filteredUserCommentHistoryArray
    await foundUser.save()

    let foundPost = await Post.findOne({
        _id: postCommentedOn
    })
    let postCommentHistoryArray = foundPost.postComments
    let filteredPostCommmentHistoryArray = postCommentHistoryArray.filter((item) => item.id.toString() !== req.params.id)
    foundPost.postComments = filteredPostCommmentHistoryArray
    await foundPost.save()


    res.json({
        message: 'This is where you delete Comments;',
        payload: deletedComment,
    })
})


module.exports = router;