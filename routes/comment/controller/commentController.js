const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Comment = require('../model/Comment')
const User = require('../../user/model/User')
const Post = require('../../post/model/Post')

async function fetchAllComments(req, res, next) {
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
}

async function createComment(req, res, next) {
    const {
        commentContext,
        commentOwner,
        postCommentedOn,
        commentCommentedOn,
    } = req.body
    let errObj = {}
    if (Object.keys(errObj).length > 0) {
        return res.status(500).json({
            message: "Error In Creating Comment",
            error: err.message
        })
    }
    let decodedData = jwt.decode(req.headers.authorization.slice(7))
    let foundUser = await User.findOne({
        email: decodedData.email,
    })
    let foundPost = await Post.findOne({
        id: req.body.postCommentedOn
    })
    if (commentCommentedOn) {
        let foundComment = await Comment.findOne({
            id: req.body.commentCommentedOn
        })
    }
    const createdComment = new Comment({
        commentContext,
        commentOwner: foundUser._id,
        postCommentedOn: foundPost._id,
        if (commentCommentedOn) {
            commentCommentedOn: foundComment._id
        },
    })
    let savedComment = await createdComment.save()
    foundUser.commentHistory.push(savedComment._id)
    foundPost.postComments.push(savedComment._id)
    if (commentCommentedOn) {
        foundComment.commentHistory.push(savedComment._id)
        await foundComment.save()
    }
    await foundUser.save()
    await foundPost.save()
    res.json({
        message: "This is where you create Comments",
        payload: createdComment
    })
}

async function editComment(req, res, next) {
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


}

module.exports = {
    fetchAllComments,
    createComment,
    editComment
}