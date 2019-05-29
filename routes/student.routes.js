const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    studentController = require('../controllers/student.controller');

const StudentRouter = express.Router();


StudentRouter.post('/create', studentController.Create);
StudentRouter.get('/all', studentController.FindAll);
StudentRouter.get('/:id', studentController.findOne);
StudentRouter.delete('/:id', studentController.remove);
StudentRouter.put('/:id', studentController.update);
StudentRouter.get('/try', authorize(Role.Student), studentController.temp);

module.exports = StudentRouter;