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
} = require("./controller/postController")


router.get('/fetch-posts', jwtMiddleware, fetchPosts);

router.post('/create-post', createPost);

router.put('/edit-post-by-id/:id', jwtMiddleware, editPostById);

router.delete('/delete-post-by-id/:id', jwtMiddleware, async function (req, res, next) {


    try {

        let deletedPost = await Post.findByIdAndDelete(req.params.id)

        if (!deletedPost) {
            return res.status(500).json({
                message: "Post Not Found To Delete: Check ID and Try Again",
                error: "Post Not Found To Delete"
            })
        }
        const decodedData = res.locals.decodedData;
        let foundUser = await User.findOne({
            email: decodedData.email,
        })

        let userPostHistoryArray = foundUser.postHistory
        let filteredPostHistoryArray = userPostHistoryArray.filter(
            (item) => item._id.toString() !== req.params.id
        )

        foundUser.postHistory = filteredPostHistoryArray

        await foundUser.save()

        res.json({
            message: 'Place where you will delete posts\nif you are readying this SUccess!!!',
            deletedPost
        })
    } catch (err) {
        res
            .status(500)
            .json({
                message: "Error Deleting Post",
                error: err.message
            })
    }
})

module.exports = router