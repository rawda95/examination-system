const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    TeacherSubjestController = require('../controllers/teacher.subject.controller');

const TeacherSubjectRouter = express.Router();


TeacherSubjectRouter.get('/', authorize(Role.Teacher), TeacherSubjestController.FindTeacherCourses);
TeacherSubjectRouter.post('/:id', authorize(Role.Admin), TeacherSubjestController.addCourseToTeacher);
TeacherSubjectRouter.delete('/:id', authorize(Role.Admin), TeacherSubjestController.RemoveCourseFromTeacher);

module.exports = TeacherSubjectRouter;