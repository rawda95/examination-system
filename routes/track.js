let express = require("express"),
    mongoose = require("mongoose");
require("./../Models/questionModel");
require("./../Models/typeModel");
require("./../Models/answersModel");
require("./../Models/trackModel");
var microtime = require('microtime');
let track = express.Router();
let questionSchema = mongoose.model("question");
let typeSchema = mongoose.model("type");
let answersSchema = mongoose.model("answers");
let teacherSchema = mongoose.model("teacher");
let subjectSchema = mongoose.model("subject");
let trackSchema = mongoose.model("track");

track.get("/list", (request, response) => {
    console.log("hello");
    trackSchema.find({})
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


track.get("/getbyid/:id", (request, response) => {
    console.log("hello");
    trackSchema.findOne({ _id: request.params.id })
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

track.get("/delete/:id", (request, response) => {
    console.log("came here ");
    trackSchema.remove({ _id: request.params.id }, (error) => {
        if (!error) {
            console.log("hjkikj")
            response.redirect("/track/list");
        } else {
            console.log(error.message);
        }
    })
}); //delete track 

track.post("/add", (request, response) => {
    console.log("call post method");
    var x = microtime.now();

    let Mytrack = new trackSchema({
        _id: x.toString(),
        name: request.body.name

    });

    // اها طريقه اخلق بيها ال id 

    console.log(Mytrack);


    Mytrack.save((error) => {
        if (!error) {
            response.send(Mytrack);
        } else {
            console.log(error.message);
        }
    });


}); // add an track     


track.get("/edit/:id", (request, response) => {
    console.log("hhjj");
    trackSchema.findOne({ _id: request.params.id }, (

        error, result) => {
        response.send({ reqAns: result })
    })


});


track.post("/edit/:id", (request, response) => {
        console.log("come to edit");
        trackSchema.updateOne({ _id: request.params.id }, {
            $set: {
                name: request.body.name,

            }
        }, (error) => {
            if (!error) {
                console.log("done");
            } else {
                console.log(error.message)
            }
        });
    }) // edit track 





module.exports = track;