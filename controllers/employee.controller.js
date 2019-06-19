const mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role');
require('../Models/student');

require('../Models/employee');

const UserModel = mongoose.model('User');
const EmpModel = mongoose.model('Employee');


const Create = async(req, res, next) => {

    let message = '';
    let errorCheck = false;

    if (!req.body.username) {
        // res.status(400).send({

        //     message: 'username is required'
        // });
        message += ' username is required,';
        errorCheck = true;
    }
    if (!req.body.password) {
        // res.status(400).send({

        //     message: 'password is required'
        // });
        message += ' password is required,';
        if (!errorCheck) {
            errorCheck = true;
        }

    }


    if (!req.body.FirstName) {
        // res.status(400).send({

        //     message: 'password is required'
        // });
        message += ' FirstName is required,';
        if (!errorCheck) {
            errorCheck = true;
        }

    }

    if (!req.body.LastName) {
        // res.status(400).send({

        //     message: 'password is required'
        // });
        message += ' LastName is required,';
        if (!errorCheck) {
            errorCheck = true;
        }

    }
    if (!req.body.Email) {
        // res.status(400).send({

        //     message: 'password is required'
        // });
        message += ' Email is required,';
        if (!errorCheck) {
            errorCheck = true;
        }

    }
    if (!req.body.Phone) {
        // res.status(400).send({

        //     message: 'Phone is required'
        // });
        message += ' Phone is required,';
        if (!errorCheck) {
            errorCheck = true;
        }

    }

    if (errorCheck) {
        res.status(400).send({
            message: message

        });
    }



    emp = new EmpModel({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Phone: req.body.Phone,
    });




    try {
        let data = await emp.save();

    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }

    try {
        passport.authenticate('signup', { session: false }, async(err, user, info) => {
            if (err) {
                return res.status(400).send({
                    message: err
                });

            } else {
                if (!req.body) {
                    res.status(400).send({
                        message: 'employee content can not be empty'
                    });

                }


                user.role = Role.Emp;
                user.email = req.body.email;
                try {
                    await user.save();
                    emp.User = user;
                    await emp.save();
                } catch (error) {
                    res.status(400).send({
                        message: error
                    });
                }

                res.status(201).send({
                    emp: {
                        username: user.username,
                        id: user._id,
                        FullName: emp.FullName,
                        Phone: emp.Phone,
                        Email: user.Email,

                    }
                });

            }

        })(req, res, next);
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }

};




const FindAll = async(req, res, next) => {


    try {


        // // try show user
        let employees = await EmpModel.find({}).populate({
            path: 'User',
            select: 'username role _id Email'
        }).select(' FirstName LastName Phone');
        res.send(employees);


    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }


};


const findOne = async(req, res) => {
    if (isNaN(req.params.id)) {
        return res.status(400).send({
            message: 'id must be a number'
        });
    }
    try {
        employee = await EmpModel.findOne({ User: req.params.id }).populate({
            path: 'User',
            select: 'username  Email _id'
        }).select('FirstName LastName Phone');
        if (!employee) {
            return res.status(404).send({
                message: `employee not found with id ${req.params.id}`
            });
        } else {
            return res.send(employee);
        }


    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'employee not found',
            });
        }
        return res.status(500).send({
            error: error.message,
            message: `something wrong retrieving employee with id ${req.params.id}`
        });
    }


};




const update = async(req, res, next) => {

    if (isNaN(req.params.id)) {
        return res.status(400).send({
            message: 'id must be a number'
        });
    }
    if (!req.body) {
        return res.status(400).send({
            message: 'employee content can not be empty'
        });
    }


    try {
        let employee = await EmpModel.findOneAndUpdate({ User: req.params.id }, {

            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Phone: req.body.Phone

        }, { new: true }).populate({
            path: 'User',
            select: 'username Email _id'
        }).select('FirstName LastName Phone');
        try {
            let user = await UserModel.findById(employee.User);
            user.Email = req.body.Email;

            user.save();
        } catch (UserError) {
            return res.status(404).send({
                message: UserError.message,
            });
        }

        if (!employee) {
            return res.status(404).send({
                message: `employee not found with id ${req.params.id}`
            });
        }
        res.send(employee);

    } catch (error) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `employee not found with id ${req.params.id}`
            });

        }
        return res.status(500).send({
            message: `something wrong updating employee with id ${req.params.id}`
        });

    }


};

const remove = async(req, res) => {

    try {
        let employee = await EmpModel.findOne({ User: req.params.id });
        if (!employee) {
            return res.status(404).send({
                message: `employee not found with id ${req.params.id}`
            });
        }
        // let user = UserModel.findById(student.user);
        // console.log(employee);


        try {
            user = await UserModel.findByIdAndRemove(student.User);
            employee.remove();
        } catch (error) {
            res.status(400).send({
                message: 'cant not delete student try later'
            });
        }
        res.send({
            message: 'employee deleted succssfult !'
        });
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name == 'NotFound') {
            return res.status(404).send({
                message: `employee not found with id ${req.params.id}`
            });

        }
        return res.status(500).send({
            message: `could not delete employee with id  ${req.params.id}`
        });
    }

};






module.exports = {
    Create,
    FindAll,
    findOne,
    update,
    remove
};