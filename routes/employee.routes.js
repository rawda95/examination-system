const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    EmpController = require('../controllers/employee.controller');

const EmptRouter = express.Router();


EmptRouter.post('/create', authorize(Role.Admin), EmpController.Create);
EmptRouter.get('/', authorize(Role.Admin), EmpController.FindAll);
EmptRouter.get('/:id', authorize(Role.Admin), EmpController.findOne);
EmptRouter.delete('/:id', authorize(Role.Admin), EmpController.remove);
EmptRouter.put('/:id', authorize(Role.Admin), EmpController.update);
//EmptRouter.get('/try', authorize(Role.Student), EmpController.temp);

module.exports = EmptRouter;