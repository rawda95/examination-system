const mongoose=require("mongoose");
const mongoose_unique_validator=require("mongoose-unique-validator");

const userSchema=mongoose.Schema({
    userName:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
 });
userSchema.plugin(mongoose_unique_validator);

module.exports=mongoose.model("User",userSchema);