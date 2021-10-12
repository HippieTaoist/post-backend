const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        validate: /^[a-zA-Z]*$/
    },
    lastName: {
        type: String,
        validate: /^[a-zA-Z]*$/,
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    postHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: "post"
    }],
    commentHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: "comment"
    }]
}, {
    timestamps: true
})