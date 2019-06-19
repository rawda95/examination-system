const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    TeacherSubjestController = require('../controllers/teacher.subject.controller');

const TeacherSubjectRouter = express.Router();


TeacherSubjectRouter.get('/:id', TeacherSubjestController.FindTeacherCourses);
TeacherSubjectRouter.post('/:id', TeacherSubjestController.addCourseToTeacher);
TeacherSubjectRouter.delete('/:id', TeacherSubjestController.RemoveCourseFromTeacher);

module.exports = TeacherSubjectRouter;