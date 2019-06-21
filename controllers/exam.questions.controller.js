const mongoose = require("mongoose"),
    Level = require('../_helpers/questionLevel');

require("../Models/Exam.questions");
require("../Models/questionModel");
require("../Models/student");
require("../Models/Exam");
require('../Models/Exam.student');


const examQuestionsModel = mongoose.model("ExamQuestions"),
    questionModel = mongoose.model("question"),
    ExamModel = mongoose.model("Exam"),
    studentModel = mongoose.model("Student"),
    ExamStudentModel = mongoose.model('ExamStudent');


//jshint ignore:start

const Create = async(req, res) => {
    try {

        var student = await studentModel.findOne({
            User: req.user
        });
    } catch (studentError) {
        res.status(400).send({
            message: studentError.message
        });
    }
    try {
        let exam = await ExamModel.findById(req.body.examId).populate({
            path: "course"
        });
        if (!exam) {
            res.status(400).send({
                message: `cant find exam with this id ${req.body.examId}`
            });
        }
        if (!student.Courses.find(o => o.Name === exam.course.Name)) {
            res.status(400).send({
                message: `student ${student.FirstName} not in coures ${
          exam.course.Name
        } so cant take exam in this course`
            });
        }
        // compaer date
        // let today = new Date();

        // console.log(today);
        // if (exam.startDate > today) {
        //     res.send({
        //         startDate: exam.startDate,
        //         today: today
        //     });
        // } else {
        //     res.send({
        //         date: today.getDate()
        //     });
        // }
        var questions = [];

        questionModel.findRandom({
                level: Level.Hard
            }, {}, {

                limit: exam.numOfHardQ
            },
            async function(err, results) {
                if (err) {
                    res.status(400).send({
                        message: err.message,
                        error: 'error'
                    });

                } else {
                    results = results.map(o => { return o.id });
                    // console.log(`results ${results}`);


                    Array.prototype.push.apply(questions, results);

                    questionModel.findRandom({
                            level: Level.Easy
                        }, {}, {

                            limit: exam.numOfEasyQ
                        },
                        async function(err, results) {
                            if (err) {
                                res.status(400).send({
                                    message: err.message,
                                    error: 'error'
                                });

                            } else {
                                // console.log(`results ${results}`);
                                results = results.map(o => { return o.id });
                                // console.log(`results ${results}`);

                                Array.prototype.push.apply(questions, results);




                                questionModel.findRandom({
                                        level: Level.Normal
                                    }, {}, {

                                        limit: exam.numOfNormalQ
                                    },
                                    async function(err, results) {
                                        if (err) {
                                            res.status(400).send({
                                                message: err.message,
                                                error: 'error'
                                            });

                                        } else {
                                            results = results.map(o => { return o.id });
                                            // console.log(`results ${results}`);

                                            Array.prototype.push.apply(questions, results);


                                            let examQuestions = await new examQuestionsModel({
                                                exam: exam._id,
                                                questions: questions
                                            });

                                            // console.log(`exam ${examQuestions}`);
                                            examQuestions.save();
                                            examQuestionsModel.populate(examQuestions, {
                                                path: 'questions'
                                            }, function(err, q) {
                                                // examQuestions = q;
                                                res.send({
                                                    q,
                                                    time: exam.Time
                                                });

                                            });




                                        }
                                    });


                            }
                        });

                }
            });

    } catch (examErorr) {
        res.status(400).send({
            message: examErorr.message
        });
    }
};


const answerExam = async(req, res) => {

    try {

        var student = await studentModel.findOne({
            User: req.user
        });
        if (!student) {
            res.status(400).send({
                message: 'cant find student with this id '
            });
        }

        var examQ = await examQuestionsModel.findById(req.body.examQId);
        if (!examQ) {
            res.status(400).send({
                message: 'Cant find exam with this id '
            });
        }

        var studentAnswer = new ExamStudentModel({
            exam: examQ._id,
            studnet: student.User,

        });
        req.body.AnswerList.forEach(answer => {

            // console.log(`exam questions ${examQ}`);
            if (!examQ.questions.includes(answer.question)) {

                res.status(400).send({
                    message: `exam has no question with id ${answer.question}`

                });
            } else {

                studentAnswer.AnswerList.push(answer);

            }
        });

        try {
            await studentAnswer.save();


            correctExam(1, studentAnswer);
            // var a = correctExam(1, studentAnswer);
            // a.then(ret_val => {
            //     // a = ret_val;
            //     console.log(` ret_val : ${ret_val}`);

            //     //you can access boolean here in ret_val
            // });

            // console.log(` a : ${a}`);
            res.send({
                message: 'saved',

            });

        } catch (err) {
            res.status(400).send({
                message: err.message
            });
        }

    } catch (findError) {
        res.status(400).send({
            message: findError.message
        });
    }

}








const correctExam = async(examQId, studentAnswer) => {

    console.log(`id : ${studentAnswer}`);
    console.log(studentAnswer.id)
    let id = studentAnswer.id;
    try {
        let x = await ExamStudentModel.findById(id).populate(studentAnswer, {
            path: 'AnswerList.question'
        });
        console.log(`x ${x}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    Create,
    answerExam
};

/* jshint ignore:end */