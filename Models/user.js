const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    autoIncrement = require('mongoose-auto-increment'),

    Schema = mongoose.Schema;
autoIncrement.initialize(mongoose);


const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true


    },

    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    }

});

UserSchema.pre('save', async function(next) {

    // not usfual 
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

UserSchema.plugin(autoIncrement.plugin, 'Users');

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;