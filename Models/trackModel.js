let mongoose=require("mongoose");  
let trackSchema=new mongoose.Schema({ 
   _id : String, 
     name:String
});

mongoose.model("track",trackSchema);