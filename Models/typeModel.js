let mongoose = require("mongoose");


let typeSchema = new mongoose.Schema({
    // _id:String,
    header: String

});



mongoose.model("type", typeSchema);