let express = require("express"),
    mongoose = require("mongoose");
require("./../Models/questionModel");
require("./../Models/typeModel");
require("./../Models/answersModel");
let teacher = express.Router();
let questionSchema = mongoose.model("question");
let typeSchema = mongoose.model("type");
let answersSchema = mongoose.model("answers");
let teacherSchema = mongoose.model("teacher");
let subjectSchema = mongoose.model("subject");



let authorize = require('../_helpers/authorize'),
    Role = require('../_helpers/role');


teacher.get("/list", authorize(Role.Emp), (request, response) => {

    teacherSchema.find({})

    .then((result) => {
        response.send(result);
    })

    .catch((error) => {
        console.log(error.message)
    });



}); // get all teachers    
teacher.get("/delete/:id", authorize(Role.Admin), (request, reposne) => {

    teacherSchema.remove({ _id: request.params.id }, (error) => {
        if (!error) {
            reposne.redirect("/teacher/list");
        } else {
            console.log(error.message);
        }
    })

}); //delete teacher  


teacher.post("/add", authorize(Role.Admin), (request, response) => {

        let Myteacher = new teacherSchema({

            name: request.body.Name,
            Sub: request.body.sub

        });
        Myteacher.save((error) => {
            if (!error) {
                response.redirect("/teacher/list");
            } else {
                console.log(error.message)
            }
        });
    }) // add teacher    

teacher.get("/edit/:id", authorize(Role.Admin), (request, response) => {

    teacherSchema.findOne({ _id: request.params.id }, (error, result) => {
        response.send({ reqAns: result })
    })


});


teacher.post("/edit/:id", authorize(Role.Admin), (request, response) => {
        teacherSchema.updateOne({ _id: request.params.id }, {
            $set: {
                name: request.body.name,
                Sub: request.body.sub
            }
        }, (error) => {
            if (!error) {
                response.redirect("/teacher/list");
            } else {
                console.log(error.message)
            }
        });
    }) // edit teacher  




teacher.get("/getteacherrel/:id", authorize(Role.Admin), (request, response) => {
    console.log("come to this link");
    console.log("come to this link2");
    console.log(request.params.id);
    teacherSchema.find({ Sub: request.params.id })
        .then((result) => {
            response.status(200).json(
                result
            );
            console.log(result);
        })
        .catch((error) => {
            console.log(error.message);
            response.send("error");
        });
});







teacher.post("/edit/:id", authorize(Role.Admin), (request, response) => {
        teacherSchema.updateOne({ _id: request.params.id }, {
            $set: {
                name: request.body.name,
                Sub: request.body.sub
            }
        }, (error) => {
            if (!error) {
                console.log("done");
            } else {
                console.log(error.message)
            }
        });
    }) // edit teacher  







module.exports = teacher;