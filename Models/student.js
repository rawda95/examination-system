const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const StudentModel = new Schema({

    NatinalId: {
        type: Number,
        required: true,
        unique: true

    },
    User: {
        type: Number,
        ref: 'user'
    }
});



mongoose.model('Student', StudentModel);