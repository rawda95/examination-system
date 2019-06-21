let mongoose = require("mongoose");
let answersSchema = require('./answersModel');
let autoIncrement = require('mongoose-sequence')(mongoose);

let Schema = mongoose.Schema;

var random = require('mongoose-simple-random');

let questionSchema = new mongoose.Schema({
    _id: Number,
    body: String,
    level: String,
    correctAns: String,
    Teacher: {
        type: String,
        ref: "teacher"
    },
    QuesType: {
        type: String,
    },
    Subject: {
        type: String,
        ref: "subject"
    },
    Answers: [{
        type: String,

    }]
});
questionSchema.plugin(random);
questionSchema.plugin(autoIncrement, {
    inc_field: '_id'
});
mongoose.model("question", questionSchema);