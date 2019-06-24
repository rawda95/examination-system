const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    ExamController = require('../controllers/exam.controller');
const ExamRouter = express.Router();

ExamRouter.get('/avalible', authorize(Role.Student), ExamController.getStudentAvalibleExam);

ExamRouter.get('/', ExamController.FindAll);
ExamRouter.get('/:id', authorize(Role.Teacher), ExamController.FindById);
ExamRouter.post('/', authorize(Role.Teacher), ExamController.Create);
ExamRouter.put('/:id', authorize(Role.Teacher), ExamController.Update);
ExamRouter.delete('/:id', authorize(Role.Teacher), ExamController.Remove);


// StudentRouter.get('/try', authorize(Role.Student), studentController.temp);

module.exports = ExamRouter;