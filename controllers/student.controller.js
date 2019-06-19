const mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role');
require('../Models/student');


const StudentSchema = mongoose.model('Student'),
    UserModel = require('../Models/user');


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



    if (!req.body.NatinalID) {
        // res.status(400).send({

        //     message: 'Phone is required'
        // });
        message += ' NatinalID is required,';
        if (!errorCheck) {
            errorCheck = true;
        }

    }

    if (errorCheck) {
        res.status(400).send({
            message: message

        });
    }



    student = new StudentSchema({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Phone: req.body.Phone,
        NatinalID: req.body.NatinalID
    });




    try {
        let data = await student.save();

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
                        message: 'student content can not be empty'
                    });

                }


                user.role = Role.Student;
                user.Email = req.body.Email;
                try {
                    await user.save();
                    student.User = user;
                    await student.save();
                } catch (error) {
                    res.status(400).send({
                        message: error
                    });
                }

                res.status(201).send({
                    student: {
                        username: user.username,
                        id: user._id,
                        FullName: student.FullName,
                        Phone: student.Phone,
                        Email: user.Email,

                    }
                });
            }
        })(req, res, next);
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
        // console.log(req);
    }
};




const FindAll = async(req, res, next) => {

    try {

        let students = await StudentSchema.find({}).populate({
            path: 'User',
            select: 'username role _id Email'
        }).select('NatinalID FirstName LastName Phone');
        // console.log(JSON.parse(students));

        res.send({ students });
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
        student = await StudentSchema.findOne({ User: req.params.id }).populate({
            path: 'User',
            select: 'username  Email _id'
        }).select('NatinalID FirstName LastName Phone');
        if (!student) {
            return res.status(404).send({
                message: `student not found with id ${req.params.id}`
            });
        } else {
            return res.send({ student });
        }


    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'student not found',
            });
        }
        return res.status(500).send({
            message: `something wrong retrieving studnet with id ${req.params.id}`
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
            message: 'studnet content can not be empty'
        });
    }

    try {
        let student = await StudentSchema.findOneAndUpdate({ User: req.params.id }, {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Phone: req.body.Phone

        }, { new: true }).populate({
            path: 'User',
            select: 'username Email _id'
        }).select('FirstName LastName Phone');

        try {
            let user = await UserModel.findById(student.User);
            user.Email = req.body.Email;

            user.save();
        } catch (UserError) {
            return res.status(404).send({
                message: UserError.message,
            });
        }



        if (!student) {
            return res.status(404).send({
                message: `student not found with id ${req.params.id}`
            });
        }
        res.send(student);

    } catch (error) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `student not found with id ${req.params.id}`
            });

        }
        return res.status(500).send({
            message: `something wrong updating studnt with id ${req.params.id}`
        });

    }


};

const remove = async(req, res) => {

    if (isNaN(req.params.id)) {
        return res.status(400).send({
            message: 'id must be a number'
        });
    }
    try {
        let student = await StudentSchema.findOne({ User: req.params.id });
        if (!student) {
            return res.status(404).send({
                message: `studnt not found with id ${req.params.id}`
            });
        }
        // let user = UserModel.findById(student.user);
        try {
            user = await UserModel.findByIdAndRemove(student.User);
            student.remove();
        } catch (error) {
            res.status(400).send({
                message: 'cant not delete student try later'
            });
        }
        res.send({
            message: 'student deleted succssfult !'
        });
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name == 'NotFound') {
            return res.status(404).send({
                message: `studnt not found with id ${req.params.id}`
            });

        }
        return res.status(500).send({
            message: `could not delete studnet with id  ${req.params.id}`
        });
    }

};






let temp = (req, res, next) => {

    // let aut = authorize(Role.Student);

    // return res.status(aut.status).send({
    //     message: aut.message
    // });

    return res.status(400).send({
        message: 'remp'
    });

};
module.exports = {
    Create,
    temp,
    FindAll,
    findOne,
    update,
    remove
};