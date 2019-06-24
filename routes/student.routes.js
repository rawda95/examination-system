const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    studentController = require('../controllers/student.controller'),
    studentSubjectRouter = require('./student.subjest.routes'),
    ExamQuestionsRouter = require('./exam.questions.routes');

const StudentRouter = express.Router();

StudentRouter.use('/courses', authorize(Role.Student), studentSubjectRouter);
StudentRouter.use('/exam', authorize(Role.Student), ExamQuestionsRouter);
StudentRouter.post('/', authorize(Role.Emp), studentController.Create);
StudentRouter.get('/', authorize(Role.Emp), studentController.FindAll);
StudentRouter.get('/:id', authorize(Role.Emp), studentController.findOne);
StudentRouter.delete('/:id', authorize(Role.Emp), studentController.remove);
StudentRouter.put('/:id', authorize(Role.Emp), studentController.update);
// StudentRouter.get('/try', authorize(Role.Student), studentController.temp);

module.exports = StudentRouter;