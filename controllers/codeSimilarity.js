let express = require("express"),
    path = require("path"),
    paiza_io = require('paiza-io'),
    leven = require('leven'),
    stringSimilarity = require('string-similarity');
bodyParser = require('body-parser')


let CodeSimilarity = express.Router();


let insCode = `
using System;
namespace HelloWorld
{
    class Hello 
    {
        static void Main() 
        {
            Console.WriteLine("An operating system is the primary software that manages all the hardware and other software on a computer.");

            // Keep the console window open in debug mode.
            Console.ReadKey();
        }
    }
}
`;


let studCode = `
using System;
namespace HelloWorld
{
    class Hello 
    {
        static void Main() 
        {
            Console.WriteLine("An operating system is system software that manages computer hardware and software resources and provides common services for computer programs.");

            // Keep the console window open in debug mode.
            Console.ReadKey();
        }
    }
}
`;

let lang = 'csharp';

// localhost:8080/speaker/add
CodeSimilarity.post("/code", bodyParser.json(), (request, response) => {
    console.log(request.body);
    lang = request.body.lang;
    studCode = request.body.code;
    paiza_io(lang,
        insCode, '',
        function(InstructorError, instructorReuslt) {
            if (InstructorError) response.send({ "data": "Run Code Again -- Internet Connecction is slow" });
            else {
                console.log("Instr"); //=> Hello, C++ World!
                paiza_io(lang,
                    studCode, '',
                    function(studentError, studentReuslt) {
                        if (studentError) response.send({ "data": "Run Code Again -- Internet Connecction is slow" });
                        else {
                            console.log("stude")
                            var res = stringSimilarity.compareTwoStrings(instructorReuslt.stdout, studentReuslt.stdout);
                            console.log(res)

                            response.send({ "data": res });


                        } // Check Student
                    }); //Student paiza_io



            } // If Not  error instrucot


        }); // Instructor Paizzo
    //   response.send("Get Add");
});





CodeSimilarity.get("/code1", (request, response) => {
    paiza_io(lang,
        insCode, '',
        function(InstructorError, instructorReuslt) {
            if (InstructorError) console.log('API Instructor Error');
            else {
                console.log(instructorReuslt.stdout); //=> Hello, C++ World!
                paiza_io(lang,
                    studCode, '',
                    function(studentError, studentReuslt) {
                        if (studentError) console.log('API Student Error', studentError);
                        else {
                            console.log(studentReuslt.build_stderr)
                            var res = stringSimilarity.compareTwoStrings(instructorReuslt.stdout, studentReuslt.stdout);
                            response.render("Code/code", {
                                TeacherAnswer: instructorReuslt.stdout,
                                StudentAnswer: studentReuslt.stdout,
                                resultFinal: res
                            });
                            // response.render("Code/code");
                            // response.send(`
                            // TeaherAnswer: ${instructorReuslt.stdout} \n
                            // Student Answer: ${studentReuslt.stdout} \n
                            // Rseult = ${instructorReuslt.stdout == studentReuslt.stdout}`);

                        } // Check Student
                    }); //Student paiza_io



            } // If Not  error instrucot


        }); // Instructor Paizzo
    //   response.send("Get Add");
});

CodeSimilarity.post("/code", (request, response) => {

    paiza_io(lang,
        request.body.code, '',
        function(runError, runReuslt) {
            if (runError) console.log('API Instructor Error');
            else {
                console.log(runReuslt.stdout);
                response.send(runReuslt.stdout);
                // response.render("Code/code", {
                //     output: runReuslt.stdout,
                //     TeacherAnswer: 0,
                //     StudentAnswer: 0 , 
                //     resultFinal: 0});
            }
        });



    //response.send(`Post Add ${request.body.code}`);
});


CodeSimilarity.get("/edit", (request, response) => {
    response.send("Get Edit");
})


CodeSimilarity.get("/text", (request, response) => {
    var similarity = stringSimilarity.compareTwoStrings('5', '51');
    console.log("ddddd ", similarity)
    response.send(`similarity: ${similarity}`);
});


CodeSimilarity.get("/delete", (request, reponse) => {
    reponse.send("Delete Get");
});

CodeSimilarity.post("/delete", (request, response) => {
    response.send("Delete Post");
})
module.exports = CodeSimilarity;