const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const UserModel = mongoose.model('User');

const EmpSchema = new Schema({

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

    }, {
        toObject: {
            transform: function(doc, ret) {

                delete ret._id;
            }
        },
        toJSON: {

            transform: function(doc, ret) {
                // try {
                //     id = await UserModel.findById(ret.User).select('_id');
                //     ret.id = id.id;
                // } catch (error) {

                // }

                // UserModel.findById(ret.User, function(err, data) {
                //     let id = data.id;
                //     ret.id = id;
                //     delete ret._id;

                //     console.log(` in  find ${id}`);
                // });
                // console.log(` global ${id}`);
                //     ret.id = id;
                //     delete ret._id;
            }
        }
    }

);


EmpSchema.virtual('FullName').get(function() {

    return this.FirstName + ' ' + this.LastName;
});

// EmpSchema.options.toJSON = {
//     transform: async function(doc, ret, options) {
//         try {
//             id = await UserModel.findById(ret.User).select('_id');
//             ret.id = id.id;
//             delete ret._id;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// };


mongoose.model('Employee', EmpSchema);