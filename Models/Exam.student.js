const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const ExamStudentModel = new Schema({

    exam: {
        type: Schema.Types.ObjectId,
        ref: 'ExamQuestions'
    },
    studnet: {
        type: Number,
        ref: 'User'
    },
    AnswerList: [{
        question: {
            type: Number,
            ref: 'question'
        },
        answer: {
            type: String
        }
    }],
    grade: {
        type: Number
    }

});

mongoose.model('ExamStudent', ExamStudentModel);