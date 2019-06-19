const express = require("express"),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role'),
    EmpController = require('../controllers/employee.controller');

const EmptRouter = express.Router();


EmptRouter.post('/create', EmpController.Create);
EmptRouter.get('/', EmpController.FindAll);
EmptRouter.get('/:id', EmpController.findOne);
EmptRouter.delete('/:id', EmpController.remove);
EmptRouter.put('/:id', EmpController.update);
//EmptRouter.get('/try', authorize(Role.Student), EmpController.temp);

module.exports = EmptRouter;