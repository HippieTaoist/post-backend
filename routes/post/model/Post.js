const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({

    postTitle: {
        type: String,
    },
    postContext: {
        type: String,
    },
    postOwner: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    postComments: {
        type: mongoose.Schema.ObjectId,
        ref: "comment"
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("post", PostSchema)