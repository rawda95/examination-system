const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    teacherController = require('../controllers/teacher.controller'),
    TeacherSubjectRouter = require('./teacher.subjest.routes');

const teacherRouter = express.Router();

teacherRouter.use('/courses', passport.authenticate('jwt', { session: false }), authorize(Role.Teacher), TeacherSubjectRouter);
teacherRouter.post('/', authorize(Role.Admin), teacherController.Create);
teacherRouter.get('/', authorize(Role.Admin), teacherController.FindAll);
teacherRouter.get('/:id', authorize(Role.Admin), teacherController.findOne);
teacherRouter.delete('/:id', authorize(Role.Admin), teacherController.remove);
teacherRouter.put('/:id', authorize(Role.Admin), teacherController.update);

// StudentRouter.get('/try', authorize(Role.Student), studentController.temp);

module.exports = teacherRouter;