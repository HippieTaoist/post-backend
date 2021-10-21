const Post = require('../model/Post')
const User = require('../../user/model/User')


async function fetchPosts(req, res, next) {

    let foundAllPosts = await Post.find({}).populate("owner", "username",
        "_id");


    res.json({
        message: 'Place where yhou wil get all posts back',
        payload: foundAllPosts
    })
}

async function createPost(req, res, next) {

    try {

        const {
            postTitle,
            postContext,
        } = req.body;

        let errObj = {}

        // if (!Alphanumeric(postTitle)) {
        //     errObj.postTitle = "Please no special characters in title"
        // }

        if (Object.keys(errObj).length > 0) {
            return res
                .status(500)
                .json({
                    message: "Error In Creating Post",
                    error: errObj,
                })
        }

        let decodedData = jwt.decode(req.headers.authorization.slice(7), process.env.SECRET_KEY)

        console.log("Line XXX - decodedData -", decodedData)

        let foundUser = await User.findOne({
            email: decodedData.email,
        })

        const createdPost = new Post({
            postTitle,
            postContext,
            postOwner: foundUser._id,
        })

        let savedPost = await createdPost.save()

        foundUser.postHistory.push(savedPost._id)

        await foundUser.save()

        res.json({
            message: 'Place where yhou will create posts',
            payload: createdPost

        })
    } catch (err) {
        res.json({
            message: 'Error creating post',
            ERROR: err.message
        })
    }


}

async function editPostById(req, res, next) {
    const {
        postTitle,
        postContext
    } = req.body


    try {
        let editedPost = await Post.findByIdAndUpdate(req.params.id)
        console.log("Line XXX - editedpost -", editedPost)
        if (!editedPost) {
            return res.status(404).json({
                message: "No Post Found that Matches that ID"
            });
        }

        const decodedData = res.locals.decodedData;
        console.log("Line XXX - decodedData -", decodedData)
        let foundUser = await User.findOne({
            email: decodedData.email,
        })

        if (!foundUser) {

        } else {
            editedPost.postTitle = postTitle;
            editedPost.postContext = postContext
        }
        let savedPost = await editedPost.save()
        res.json({
            message: 'Post Edited Successfully',
            payload: savedPost
        })
    } catch (err) {
        res
            .status(500)
            .json({
                message: "Error In Editing Post",
                error: err.message
            })
    }
}

async function deletePostById(req, res, next) {


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
            (item) => `${item._id}` !== `$(deletedPost._id)`
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
}

module.exports = {
    fetchPosts,
    createPost,
    editPostById,
    deletePostById,
}