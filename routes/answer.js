let express = require("express"),
    mongoose = require("mongoose");
require("./../Models/questionModel");
require("./../Models/typeModel");
require("./../Models/answersModel");
let answer = express.Router();
let questionSchema = mongoose.model("question");
let typeSchema = mongoose.model("type");
let answersSchema = mongoose.model("answers");
let teacherSchema = mongoose.model("teacher");
let subjectSchema = mongoose.model("subject");
answer.get("/list", (request, response) => {

    answersSchema.find({})

    .then((result) => {
        response.send(result);
    })

    .catch((error) => {
        console.log(error.message)
    });



}); // get all answers 
answer.post("/add", (request, response) => {

    let Myanswer = new answersSchema({

        answer: request.body.Answer

    });
    Myanswer.save((error) => {
        if (!error) {
            response.redirect("/answer/list");
        } else {
            console.log(error.message);
        }
    });


}); // add an answer 

answer.get("/delete/:id", (request, response) => {
    answersSchema.remove({ _id: request.params.id }, (error) => {
        if (!error) {
            response.redirect("/answer/list");
        } else {
            console.log(error.message);
        }
    })
});

// remove a specefic answer 


answer.get("/edit/:id", (request, response) => {

    answersSchema.find({ _id: request.params.id }, (error, result) => {
        response.send({ reqAns: result });
    });


});


answer.post("/edit/:id", (request, response) => {
    answersSchema.updateOne({ _id: request.params.id }, {
        $set: {
            answer: request.body.Answer

        }
    }, (error) => {
        if (!error) {
            response.redirect("/answer/list");
        } else {
            console.log(error.message);
        }
    });
})

//edit answer
module.exports = answer;