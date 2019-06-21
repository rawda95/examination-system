const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    ExamQuestionsController = require('../controllers/exam.questions.controller');
const ExamQuestionsRouter = express.Router();


ExamQuestionsRouter.post('/', authorize(Role.Student), ExamQuestionsController.Create);
ExamQuestionsRouter.post('/answer/', authorize(Role.Student), ExamQuestionsController.answerExam);


// StudentRouter.get('/try', authorize(Role.Student), studentController.temp);

module.exports = ExamQuestionsRouter;