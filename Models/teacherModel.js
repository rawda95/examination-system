let mongoose = require("mongoose");
let teacherSchema = new mongoose.Schema({
    // _id:String,
    name: String,
    Sub: {
        type: String,
        ref: "subject"
    }

});

mongoose.model("Teacher", teacherSchema);