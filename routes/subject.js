let express = require("express"),
    mongoose = require("mongoose");
require("./../Models/questionModel");
require("./../Models/typeModel");
require("./../Models/answersModel");
var microtime = require('microtime');
let subject = express.Router();
let questionSchema = mongoose.model("question");
let typeSchema = mongoose.model("type");
let answersSchema = mongoose.model("answers");
let teacherSchema = mongoose.model("teacher");
let subjectSchema = mongoose.model("subject");

subject.get("/list", (request, response) => {
    console.log("hello");
    subjectSchema.find({})
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
subject.get("/getsubs/:id", (request, response) => {
    console.log("hello");
    subjectSchema.find({ Track: request.params.id })
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


subject.get("/getbyid/:id", (request, response) => {
    console.log("hello");
    subjectSchema.findOne({ _id: request.params.id })
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

subject.get("/delete/:id", (request, response) => {
    console.log("came here ");
    subjectSchema.remove({ _id: request.params.id }, (error) => {
        if (!error) {
            console.log("hjkikj")
            response.redirect("/subject/list");
        } else {
            console.log(error.message);
        }
    })
}); //delete subject 

subject.post("/add", (request, response) => {
    var x = microtime.now();
    let Mysubject = new subjectSchema({
        _id: x.toString(),
        Name: request.body.name,
        Track: request.body.Track

    });
    console.log(Mysubject);


    Mysubject.save((error) => {
        if (!error) {
            response.send(Mysubject);
        } else {
            response.status(400).send(error.message);
        }
    });


}); // add an subject     


// subject.get("/edit/:id",(request,response)=>{
//     console.log("hhjj");
//     subjectSchema.findOne({_id:request.params.id},(error,result)=>{
//         response.send({reqAns:result})
//             })


// }); 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

subject.get("/edit/:id", async(req, res) => {

    if (isNaN(req.params.id)) {
        return res.status(400).send({
            message: 'id must be a number'
        });
    }

    try {
        sub = await StudentSchema.findOne({ _id: req.params.id })
        if (!sub) {
            return res.status(404).send({
                message: `sub not found with id ${req.params.id}`
            });
        } else {
            return res.send({ sub });
        }


    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'sub not found',
            });
        }
        return res.status(500).send({
            message: `something wrong retrieving studnet with id ${req.params.id}`
        });
    }


});

subject.put("/edit/:id", async(req, res, next) => {
    console.log('in eidt function');
    console.log(req);
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
        let sub = await subjectSchema.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, { new: true })
        try {

            console.log(sub);
            sub.save();
        } catch (UserError) {
            console.log('User error', UserError);
            return res.status(404).send({
                message: UserError.message,
            });
        }



        if (!sub) {
            console.log('student not found');
            return res.status(404).send({
                message: `student not found with id ${req.params.id}`
            });
        }
        res.send(sub);

    } catch (err) {
        if (err.kind === 'ObjectId') {
            console.log('subject not found with this id ');
            return res.status(404).send({
                message: `sub not found with id ${req.params.id}`
            });

        }
        return res.status(500).send({
            message: `something wrong updating sub with id ${req.params.id}`
        });

    }


});


//////////////////////////////////////////////////////////////////////
// subject.put("/edit/:id",(request,response)=>{ 
//     console.log("come to edit");  
//     console.log(request.params.id) ; 
// subjectSchema.update({_id:request.params.id},{
//     $set:{
//       name:request.body.name

//     }
// },(error , doc)=>{
//     if(!error)
//     {
//         console.log("done") ;  
//         console.log(doc); 
//     }
//     else
//     {
//         console.log(error.message)
//     }
// });
// })  // edit subject 


module.exports = subject;