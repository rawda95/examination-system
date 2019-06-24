const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    studentSubjestController = require('../controllers/student.subjest.controller');

const StudentSubjectRouter = express.Router();


StudentSubjectRouter.get('/', authorize(Role.Student), studentSubjestController.FindStudnetCourses);

StudentSubjectRouter.post('/:id', authorize(Role.Emp), studentSubjestController.addCourseToStudent);
StudentSubjectRouter.put('/:id', authorize(Role.Emp), studentSubjestController.SetCourseDegree);

StudentSubjectRouter.delete('/:id', authorize(Role.Emp), studentSubjestController.RemoveCourseToStudent);

module.exports = StudentSubjectRouter;