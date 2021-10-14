const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentContext: {
        type: String,
    },
    commentOwner: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    postCommentedOn: {
        type: mongoose.Schema.ObjectId,
        ref: "post"
    },
    commentCommentedOn: {
        type: mongoose.Schema.ObjectId,
        ref: "comment"
    },
}, {

    timestamps: true,
})

module.exports = mongoose.model("comment", commentSchema)