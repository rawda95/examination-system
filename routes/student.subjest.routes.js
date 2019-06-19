const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    studentSubjestController = require('../controllers/student.subjest.controller');

const StudentSubjectRouter = express.Router();


StudentSubjectRouter.get('/:id', studentSubjestController.FindStudnetCourses);

StudentSubjectRouter.post('/:id', studentSubjestController.addCourseToStudent);
StudentSubjectRouter.put('/:id', studentSubjestController.SetCourseDegree);

StudentSubjectRouter.delete('/:id', studentSubjestController.RemoveCourseToStudent);

module.exports = StudentSubjectRouter;