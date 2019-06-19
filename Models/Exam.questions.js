const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const ExamQuestionModel = new Schema({

    exam: {
        type: Schema.Types.ObjectId,
        ref: 'Exam'
    },
    questions: [{
        type: Number,
        ref: 'question'
    }]

});

mongoose.model('ExamQuestions', ExamQuestionModel);