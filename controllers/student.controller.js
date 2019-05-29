const mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role');
require('../Models/student');


const StudentSchema = mongoose.model('Student'),
    UserModel = require('../Models/user');


const Create = async(req, res, next) => {
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
            // console.log(`request user : ${user}`);
            const student = new StudentSchema({
                NatinalId: req.body.NatinalId,
                User: user.id,

            });
            // update function 
            user.role = Role.Student;
            req.user.role = Role.Student;
            // console.log(req.user.role);


            try {
                let data = await student.save();
                res.send({
                    student: {
                        username: user.username,
                        NatinalId: data.NatinalId,

                    }
                });

            } catch (error) {
                res.status(500).send({
                    message: error.message
                });
            }

            // res.json({
            //     message: 'signup successful',
            //     user: req.user
            // });
        }
    })(req, res, next);
    // console.log(req);

};




const FindAll = async(req, res, next) => {

    try {
        let students = await StudentSchema.find();
        console.log(students);
        // console.log(JSON.parse(students));

        return res.send({ 'studnets ': students });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }


};


const findOne = async(req, res) => {
    try {
        student = await StudentSchema.findById(req.params.id);
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
                message: 'Product not found',
            });
        }
        return res.status(500).send({
            message: `something wrong retrieving studnet with id ${req.params.id}`
        });
    }


};




const update = async(req, res, next) => {

    if (!req.body) {
        return res.status(400).send({
            message: 'studnet content can not be empty'
        });
    }

    try {
        let student = await StudentSchema.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            NatinalId: req.params.NatinalId

        });
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
            message: `somethnf wrong updating studnt with id ${req.params.id}`
        });

    }


};

const remove = async(req, res) => {

    try {
        let student = await StudentSchema.findByIdAndRemove(req.params.id);
        if (!student) {
            return res.status(404).send({
                message: `studnt not found with id ${req.params.id}`
            });
        }
        // let user = UserModel.findById(student.user);
        console.log("in remove function ");
        console.log(student);
        UserModel.findByIdAndRemove(student.user);
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

}






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