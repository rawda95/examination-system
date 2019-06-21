const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    ExamController = require('../controllers/exam.controller');
const ExamRouter = express.Router();

ExamRouter.get('/avalible', ExamController.getStudentAvalibleExam);

ExamRouter.get('/', ExamController.FindAll);
ExamRouter.get('/:id', ExamController.FindById);
ExamRouter.post('/', ExamController.Create);
ExamRouter.put('/:id', ExamController.Update);
ExamRouter.delete('/:id', ExamController.Remove);


// StudentRouter.get('/try', authorize(Role.Student), studentController.temp);

module.exports = ExamRouter;