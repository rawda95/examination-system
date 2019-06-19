const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const teacherModel = new Schema({

        NatinalID: {
            type: Number,
            required: true,
            unique: true

        },
        FirstName: {
            type: String,
            required: [true, 'First name is required'],

        },
        LastName: {
            type: String,
            required: [true, 'Last name is required'],

        },
        Phone: {
            type: Number,
            validate: function(phone) {
                return phone;
                // return /^[0-9]\d{11}$/.test(phone);

            }
        },
        User: {
            type: Number,
            ref: 'User'
        },
        Courses: [{
                type: String,
                ref: 'subject'
            },

        ],



    }, {
        toObject: {
            transform: function(doc, ret) {

                delete ret._id;
            }
        },
        toJSON: {

            transform: function(doc, ret) {
                // delete ret._id;
            }
        }
    }


);

teacherModel.virtual('FullName').get(function() {

    return this.FirstName + ' ' + this.LastName;
});

mongoose.model('teacher', teacherModel);