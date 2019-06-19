const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const ExamModel = new Schema({

    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    teacher: {
        type: Number,
        ref: 'teacher'
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    numOfHardQ: {
        type: Number
    },
    numOfEasyQ: {
        type: Number
    },
    numOfNormalQ: {
        type: Number
    },

});

mongoose.model('Exam', ExamModel);