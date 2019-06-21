let express = require("express"),
    mongoose = require("mongoose");
require("../Models/questionModel");
require("../Models/typeModel");
require("../Models/answersModel");
require("../Models/subjectModel");
require("../Models/teacherModel");
require('../Models/teacherModel');
let question = express.Router();
let questionSchema = mongoose.model("question");
let typeSchema = mongoose.model("type");
let answersSchema = mongoose.model("answers");
let subjectSchema = mongoose.model("subject");
let teacherSchema = mongoose.model("teacher");




let questionType = require('../_helpers/questionType');
// error in populate 
question.get("/list/:id", (request, response) => {
    console.log("hello");
    console.log(request.params);
    questionSchema.find({
            Teacher: request.params.id
        })
        .populate({
            path: "QuesType answers Subject"
        })
        .then((result) => {

            console.log("result");
            response.send(result);
        })
        .catch((error) => {
            console.log(error.message);
            response.send("error");
        });
});
// get all questions that specefic teacher put 

//get all questions 
question.get('/', async(req, res) => {

    try {
        let questions = await questionSchema.find();
        res.send(questions);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});
question.get("/listques/:id", (request, response) => {
    console.log("hello");
    questionSchema.find({
            Subject: request.params.id
        })
        .populate({
            path: "QuesType  answers  Teacher Subject"
        })
        .then((result) => {
            console.log("result");
            response.send(result);
        })
        .catch((error) => {
            console.log(error.message);
            response.send("error");
        });
});
// get all question related to specefic subject 

//post or add question 
question.post("/", (request, response) => {

    let Myquestion = new questionSchema({
        body: request.body.body,
        level: request.body.level,
        correctAns: request.body.correctAns,
        QuesType: request.body.QuesType,
        Teacher: request.body.Teacher,
        Subject: request.body.Subject,

    });


    if (Myquestion.QuesType == questionType.TrueOrFalse) {
        Myquestion.Answers.push(true);
        Myquestion.Answers.push(false);
    } else if (Myquestion.QuesType === questionType.Choice) {

        console.log(request.body.answer1);
        Myquestion.Answers.push(request.body.answer1);
        Myquestion.Answers.push(request.body.answer2);
        Myquestion.Answers.push(request.body.answer3);
        Myquestion.Answers.push(Myquestion.correctAns);
    }


    Myquestion.save((error) => {
        if (!error) {
            // response.redirect("/question/list");
            console.log('in not error function on save ');
            console.log(Myquestion);
            response.send(Myquestion);
        } else {
            response.status(400).send({

                message: error.message
            });
        }
    });


});


// question.delete("/delete/:id", async(request, response) => {

//     await questionSchema.remove();
//     questionSchema.remove({
//         _id: request.params.id
//     }, (error) => {
//         if (!error) {
//             response.send('delted done ');
//         } else {
//             response.status(400).send({
//                 message: error.message
//             });
//         }
//     });
// });
// delete question 


//delete 
question.delete("/:id", (request, response) => {
    questionSchema.deleteOne({ _id: request.params.id }).then(result => {
            console.log(result);
            response.status(200).json({ message: "Question deleted" });

        }).catch(error => {
            response.status(400).send({
                message: error.message
            });
        })
        // console.log(request.params.id);
});



question.get("/edit/:id", (request, response) => {
    questionSchema.findOne({
        _id: request.params.id
    }, (error, result1) => {
        typeSchema.find({}, (error, result2) => {
            response.send({
                question: result1,
                type: result2
            });
        });

    });
});


// noha get by id 
question.get("/:id", (response, request) => {
    Question.findById(request.params.id).then(question => {
        if (question) {
            response.status(200).json(question)
        } else {
            response.status(404).json({ message: "Question Not found" })


        }
    })
});



question.post("/edit/:id", (request, response) => {
    questionSchema.updateOne({
        _id: request.params.id
    }, {
        $set: {
            body: request.body.body,
            level: request.body.level,
            correctAns: request.body.correctans,
            QuesType: request.body.questype,
            teacher: request.body.Teacher,
            Subject: request.body.subject,
            answers: request.body.Answers
        }
    }, (error) => {
        if (!error) {
            response.redirect("/question/list");
        } else {
            console.log(error.message)
        }
    });
});


// noha update 
question.put("/:id", (request, response) => {
    const question = new Question({
        _id: request.body.id,
        title: request.body.title,
        content: request.body.content
    });
    Question.updateOne({ _id: request.params.id }, question)
        .then(result => {
            console.log(result);
            response.status(200).json({ messages: "Update successful" });

        });
});


//edit question 
module.exports = question;