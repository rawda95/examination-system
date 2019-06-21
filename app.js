var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');

var cors = require('cors');
var usersRouter = require('./routes/users');

const indexRouter = require('./routes/index.routes');
var teacherRouter = require('./routes/teacher.routes');
var StudentRouter = require('./routes/student.routes');
var ExamRouter = require('./routes/exam.routes');
var empRouter = require('./routes/employee.routes');
const passport = require('passport');

//

var questionRouter = require('./routes/question');
var answerRouter = require('./routes/answer');
var typeRouter = require('./routes/type');
// var teacherRouter = require('./routes/teacher');
var subjectRouter = require('./routes/subject');
var trackRouter = require('./routes/track');
//



// connect db 
require('./_helpers/db');
var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



require('./auth/auth');
app.use(bodyparser.urlencoded({ extended: false }));






app.use('/', indexRouter);
app.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);
app.use('/emp', passport.authenticate('jwt', { session: false }), empRouter);
// app.use('/student', passport.authenticate('jwt', { session: false }), StudentRouter);

app.use('/student', passport.authenticate('jwt', { session: false }), StudentRouter);
app.use('/teacher', passport.authenticate('jwt', { session: false }), teacherRouter);
app.use('/exam', passport.authenticate('jwt', { session: false }), ExamRouter);

// catch 404 and forward to error handler






/************************ */ //
app.use('/question', questionRouter);

app.use('/type', passport.authenticate('jwt', { session: false }), typeRouter);
app.use('/answer', passport.authenticate('jwt', { session: false }), answerRouter);
// app.use('/teacher', teacherRouter);
app.use('/subject', subjectRouter);
app.use('/track', trackRouter);
/****************** */ //
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status).send({
        message: err.message
    });
});

module.exports = app;