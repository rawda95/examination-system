const mongoose = require('mongoose');
require('../Models/subjectModel');
require('../Models/student');
require('../Models/subjectModel');

const StudentModel = mongoose.model('Student'),
    CourseModel = mongoose.model('subject');

const FindStudnetCourses = async(req, res, next) => {

    console.log('in find student coureses funcation');
    try {
        // courses = await StudentModel.findOne({ User: req.params.id }).populate({
        //     path: 'Courses'
        // }).select('Courses');
        let student = await StudentModel.findOne({ User: req.user });

        if (!student) {
            return res.status(404).send({
                message: `student  not found with id ${req.params.id}`
            });
        } else {
            res.send({
                student: req.params.id,
                courses: student.Courses
            });
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



const addCourseToStudent = async(req, res, next) => {
    if (isNaN(req.params.id)) {
        return res.status(400).send({
            message: 'id must be a number'
        });
    }
    try {

        let course = await CourseModel.findOne({ Name: req.body.courseName });

        if (!course) {
            res.status(400).send({
                message: 'Cant not find coures with this id'
            });
        } else {
            try {
                console.log(req.params.id);
                let student = await StudentModel.findOne({ User: req.params.id });
                if (student.Courses.find(o => o.Name === req.body.courseName)) {
                    res.status(400).send({
                        message: `student ${student.FirstName} in course ${req.body.courseName}`
                    });
                }
                let stdCourse = {
                    Name: req.body.courseName,
                    degree: req.body.degree
                };
                student.Courses.push(stdCourse);
                student.save();
                res.send({
                    id: student.User,
                    Courses: student.Courses
                });
            } catch (studentError) {
                res.status(400).send({
                    message: ' cant save course to student ',
                    error: studentError.message

                });
            }
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
























const RemoveCourseToStudent = async(req, res, next) => {
    if (isNaN(req.params.id)) {
        return res.status(400).send({
            message: 'id must be a number'
        });
    }
    try {

        let course = await CourseModel.findOne({ Name: req.body.courseName });

        if (!course) {
            res.status(400).send({
                message: 'Cant not find coures with this Name'
            });
        } else {
            try {
                let student = await StudentModel.findOne({ User: req.params.id });
                if (!student.Courses.find(o => o.Name === req.body.courseName)) {
                    res.status(400).send({
                        message: `student ${student.FirstName}  not in course ${req.body.courseName}`
                    });
                }
                student.Courses = student.Courses.filter(o => o.Name !== req.body.courseName);
                student.save();
                res.send({
                    id: student.User,
                    Courses: student.Courses
                });
            } catch (studentError) {
                res.status(400).send({
                    message: ' cant remove course from student ',
                    error: studentError.message

                });
            }
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

const SetCourseDegree = async(req, res, next) => {


    if (isNaN(req.params.id)) {
        return res.status(400).send({
            message: 'id must be a number'
        });
    }
    try {

        let course = await CourseModel.findOne({ Name: req.body.courseName });

        if (!course) {
            res.status(400).send({
                message: 'Cant not find coures with this Name'
            });
        } else {
            try {
                console.log(req.params.id);
                let student = await StudentModel.findOne({ User: req.params.id });
                let course = student.Courses.find(o => o.Name === req.body.courseName);
                if (!course) {
                    res.status(400).send({
                        message: `student ${student.FirstName} not in course ${req.body.courseName}`
                    });
                }
                course.degree = req.body.degree;

                console.log(student);
                // let stdCourse = {
                //     Name: req.body.courseName,
                //     degree: req.body.degree
                // };
                // student.Courses.push(stdCourse);
                student.save();
                res.send({
                    id: student.User,
                    Courses: course
                });
            } catch (studentError) {
                res.status(400).send({
                    message: ' cant save course to student ',
                    error: studentError.message

                });
            }
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









module.exports = {
    FindStudnetCourses,
    addCourseToStudent,
    RemoveCourseToStudent,
    SetCourseDegree

};