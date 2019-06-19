let mongoose=require("mongoose");  

let answersSchema=new mongoose.Schema({
    _id:String,
    answer:String 
 

});

mongoose.model("answers",answersSchema); 
