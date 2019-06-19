const mongoose = require('mongoose');
require('../Models/Exam');
require('../Models/teacher');
require('../Models/subjectModel');
const ExamModel = mongoose.model('Exam'),
    teacherModel = mongoose.model('teacher'),
    courseModel = mongoose.model('subject'),
    studentModel = mongoose.model('Student'),
    studentExamModel = mongoose.model('ExamStudent');



const Create = async(req, res, next) => {

    if (!req.body) {
        res.status(400).send({
            message: 'Exam data cant not be emapty'

        });
    }


    try {

        var course = await courseModel.findById(req.body.course);
        if (!course) {
            res.status(400).send({
                message: `no course with this id ${req.body.course}`
            });
        }
    } catch (couresError) {
        res.status(400).send({
            message: couresError.message,
            error: `coures error`


        });
    }
    try {
        let teacher = await teacherModel.findOne({
            User: req.body.teacher
        });
        if (!teacher) {
            res.status(400).send({
                message: `no teacher with this id ${req.body.teacher}`
            });
        }
        if (!teacher.Courses.includes(course.Name)) {
            res.status(400).send({
                message: `teacher :${teacher.FirstName } cant set Exam to this Course ${course.Name}`

            });
        }

    } catch (teacherError) {
        res.status(400).send({
            message: teacherError.message,
            error: 'taceher eerorr'
        });
    }

    let exam = new ExamModel({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        teacher: req.body.teacher,
        course: req.body.course,
        numOfHardQ: req.body.numOfHardQ,
        numOfEasyQ: req.body.numOfEasyQ,
        numOfNormalQ: req.body.numOfNormalQ

    });

    try {
        let data = await exam.save();


        res.status(200).send({

            message: data
        });
    } catch (saveError) {
        res.status(400).send({

            message: saveError.message,
            error: 'save error'
        });
    }


};



const FindAll = async(req, res) => {


    try {

        let exams = await ExamModel.find();
        res.send({
            exams
        });

    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }

}


const Remove = async(req, res) => {

    try {
        let exam = await ExamModel.findByIdAndDelete(req.params.id);
        res.send({
            message: `exam removed done with id : ${exam.id}`

        });
    } catch (error) {
        res.status(400).send({
            message: 'cant remove exam ',
            error: error.message
        })
    }
}


const FindById = async(req, res) => {

    try {
        let exam = await ExamModel.findById(req.params.id);
        res.send(exam);

    } catch (error) {

        res.status(500).send({
            message: 'cant not get exam with this id ',
            error: error.message
        });
    }
}






const Update = async(req, res, next) => {


    if (!req.body) {
        return res.status(400).send({
            message: 'Exam content can not be empty'
        });
    }

    try {
        let exam = await ExamModel.findByIdAndUpdate(
            req.params.id, {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                numOfHardQ: req.body.numOfHardQ,
                numOfEasyQ: req.body.numOfEasyQ,
                numOfNormalQ: req.body.numOfNormalQ,

            }, {
                new: true
            });


        if (!exam) {
            return res.status(404).send({
                message: `exam not found with id ${req.params.id}`
            });
        }
        res.send(exam);

    } catch (error) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `exam not found with id ${req.params.id}`
            });

        }
        return res.status(500).send({
            message: `something wrong updating exam with id ${req.params.id}`
        });

    }


};



const getStudentAvalibleExam = async(req, res) => {

    try {

        let studnet = await studentModel.findOne({ User: req.params.id });
        let studentCoureses = await studentModel.findOne({ User: req.params.id }).select('Courses');
        studentCoureses = studentCoureses.Courses;
        studentCoureses = studentCoureses.map(o => {
            return o._id
        });
        console.log(Date.now());

        // let studentExam = await studentExamModel.find({
        //     studnet: studnet
        // }).select('exam');

        let exams = await ExamModel.find({
            'course': {
                $in: studentCoureses
            },
            // '_id': {
            //     $in: studentExam
            // }
            // 'startDate': {
            //     $lte: Date.now()
            // },
            // 'endDate': {
            //     $gte: Date.now()

            // }

        }).populate({
            path: 'course'
        });



        res.send({
            exams


        });



    } catch (UserError) {
        res.status(400).send({
            message: UserError.message
        });
    }


}



module.exports = {
    Create,
    FindAll,
    Remove,
    FindById,
    Update,
    getStudentAvalibleExam

};