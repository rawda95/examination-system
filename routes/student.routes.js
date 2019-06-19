const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    studentController = require('../controllers/student.controller'),
    studentSubjectRouter = require('./student.subjest.routes'),
    ExamQuestionsRouter = require('./exam.questions.routes');

const StudentRouter = express.Router();


StudentRouter.post('/', studentController.Create);
StudentRouter.get('/', studentController.FindAll);
StudentRouter.get('/:id', studentController.findOne);
StudentRouter.delete('/:id', studentController.remove);
StudentRouter.put('/:id', studentController.update);
StudentRouter.use('/courses', studentSubjectRouter);
StudentRouter.use('/exam', ExamQuestionsRouter);
// StudentRouter.get('/try', authorize(Role.Student), studentController.temp);

module.exports = StudentRouter;