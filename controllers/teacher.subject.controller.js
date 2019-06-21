const mongoose = require('mongoose');
require('../Models/subjectModel');
require('../Models/teacher');
require('../Models/subjectModel');

const TeacherModel = mongoose.model('teacher'),
    CourseModel = mongoose.model('subject');

const FindTeacherCourses = async(req, res, next) => {

    try {
        // courses = await StudentModel.findOne({ User: req.params.id }).populate({
        //     path: 'Courses'
        // }).select('Courses');
        console.log(req.user);
        let teacher = await TeacherModel.findOne({
            User: req.user
        });

        if (!teacher) {
            return res.status(404).send({
                message: `teacher  not found with id ${req.params.id}`
            });
        } else {
            courses = await CourseModel.find({
                Name: {
                    $in: teacher.Courses
                }
            }).populate({
                path: 'Track'
            });
            console.log(courses);
            res.send({
                teacher: req.params.id,
                courses: courses
            });
        }

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'teacher not found',
            });
        }
        return res.status(500).send({
            message: `something wrong retrieving teacher with id ${req.params.id}`
        });
    }





};



const addCourseToTeacher = async(req, res, next) => {
    if (isNaN(req.params.id)) {
        return res.status(400).send({
            message: 'id must be a number'
        });
    }
    try {

        let course = await CourseModel.findOne({
            Name: req.body.courseName
        });

        if (!course) {
            res.status(400).send({
                message: 'Cant not find coures with this id'
            });
        } else {
            try {
                console.log(req.params.id);
                let teacher = await TeacherModel.findOne({
                    User: req.params.id
                });
                if (teacher.Courses.includes(req.body.courseName)) {
                    res.status(400).send({
                        message: `teacher ${student.FirstName} in course ${req.body.courseName}`
                    });
                }

                teacher.Courses.push(req.body.courseName);
                teacher.save();
                res.send({
                    id: teacher.User,
                    Courses: teacher.Courses
                });
            } catch (teacherError) {
                res.status(400).send({
                    message: ' cant save course to teacher ',
                    error: teacherError.message

                });
            }
        }
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'teacher not found',
            });
        }
        return res.status(500).send({
            message: `something wrong retrieving studteachernet with id ${req.params.id}`
        });
    }

};
























const RemoveCourseFromTeacher = async(req, res, next) => {
    if (isNaN(req.params.id)) {
        return res.status(400).send({
            message: 'id must be a number'
        });
    }
    try {

        let course = await CourseModel.findOne({
            Name: req.body.courseName
        });

        if (!course) {
            res.status(400).send({
                message: 'Cant not find coures with this Name'
            });
        } else {
            try {
                let teacher = await TeacherModel.findOne({
                    User: req.params.id
                });
                if (!teacher.Courses.includes(req.body.courseName)) {
                    res.status(400).send({
                        message: `teacher ${teacher.FirstName}  not in course ${req.body.courseName}`
                    });
                }
                teacher.Courses = teacher.Courses.filter(o => o !== req.body.courseName);
                teacher.save();
                res.send({
                    id: teacher.User,
                    Courses: teacher.Courses
                });
            } catch (teacherError) {
                res.status(400).send({
                    message: ' cant remove course from teacher ',
                    error: teacherError.message

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
            message: `something wrong retrieving teacher with id ${req.params.id}`
        });
    }

};








module.exports = {
    FindTeacherCourses,
    addCourseToTeacher,
    RemoveCourseFromTeacher,


};