let mongoose = require("mongoose"),
    Schema = mongoose.Schema;
let subjectSchema = new mongoose.Schema({
    _id: Number,
    Name: String,
    Track: {
        type: Number,
        ref: 'track'
    }
});

mongoose.model("subject", subjectSchema);