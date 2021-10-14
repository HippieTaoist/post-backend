require("dotenv").config()

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ROUTES
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user/userRouter');
var postRouter = require('./routes/post/postRouter')
var commentRouter = require('./routes/comment/commentRouter')

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log('               ')
    console.log('                [Con]            [noC]')
    console.log('                [nec]            [cen]')
    console.log('                [ted]            [det]')
    console.log('                         [OO]         ')
    console.log('                        [G  G]        ')
    console.log('                       [N    N]       ')
    console.log('                 [    [O      O]    ]   ')
    console.log('                  D_ [M        M] _D    ')
    console.log('                    B____________B    ')
    console.log('               ')
    console.log('                         SEYES')
    console.log('                          EWE')
    console.log('                           R')

  })

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: "Error in App",
    error: err.message,
  });
});

module.exports = app;