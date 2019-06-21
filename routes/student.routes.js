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
StudentRouter.post('/', studentController.Create);
StudentRouter.get('/', studentController.FindAll);
StudentRouter.get('/:id', studentController.findOne);
StudentRouter.delete('/:id', studentController.remove);
StudentRouter.put('/:id', studentController.update);
// StudentRouter.get('/try', authorize(Role.Student), studentController.temp);

module.exports = StudentRouter;