let mongoose = require("mongoose");
let subjectSchema = new mongoose.Schema({
    Name: String
});

mongoose.model("subject", subjectSchema);