Create an app where users can make posts and make comments on the posts.
Criteria:

Commit commit commit!

CRU for users
Signup, login and update with JWT

User collection will have date, firstName, lastName, username, email, password, posts and comments

CRUD for posts

Cannot change user

Each user can create a post, edit, update and delete their own post.

Posts collection will have title, date, comments, user it belongs to, and post

CRUD for commentsconst 

Cannot change user who commented

Each can create a post, edit, update and delete their own comments

Comments collection will have date, post it belongs to, user and comment

Use MongoDB, mongoose, bcryptjs, JWT

Create Middlewares, include validators
Have a router, model and controller for user, post and comment
Everyone can see the posts and the comments
