const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    teacherController = require('../controllers/teacher.controller'),
    TeacherSubjectRouter = require('./teacher.subjest.routes');

const teacherRouter = express.Router();


teacherRouter.post('/', teacherController.Create);
teacherRouter.get('/', teacherController.FindAll);
teacherRouter.get('/:id', teacherController.findOne);
teacherRouter.delete('/:id', teacherController.remove);
teacherRouter.put('/:id', teacherController.update);
teacherRouter.use('/courses', TeacherSubjectRouter);

// StudentRouter.get('/try', authorize(Role.Student), studentController.temp);

module.exports = teacherRouter;