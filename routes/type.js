let express=require("express"),
mongoose=require("mongoose");
  require("./../Models/questionModel");
  require("./../Models/typeModel"); 
  require("./../Models/answersModel"); 
let type=express.Router(); 
let questionSchema=mongoose.model("question");
let typeSchema=mongoose.model("type");  
let answersSchema= mongoose.model("answers") ; 
let teacherSchema = mongoose.model("teacher") ; 
let  subjectSchema= mongoose.model("subject");   
  
type.get("/list",(request,response)=>{
  console.log("ffff");
    typeSchema.find({})
               .then((result)=>{
                   response.status(200).send(
                       result
                        ); 
            }) 
            
                .catch((error)=>{
                   console.log(error.message)
             });  
  
});    

type.post("/add",(request,response)=>{
            console.log("gdhhd--------------------------");
            console.log(request.body);
            
    let Mytype=new typeSchema({
       header:request.body.Header
    });
    Mytype.save((error)=>{
        if(!error)
        {
            response.redirect("/type/list");
        }
        else
        {
            console.log(error.message)
        }
    });


}); 
// add type   


type.get("/delete/:id",(request,reposne)=>{

    typeSchema.remove({_id:request.params.id},(error)=>{
        if(!error)
        {
             reposne.redirect("/type/list");
        }
        else
        {
            console.log(error.message);
        }
    })
    
    });    
    
    
    type.get("/edit/:id",(request,response)=>{

        typeSchema.findOne({_id:request.params.id},(error,result)=>{
            response.send({reqAns:result})
                })
        
    
    });   
    
    
    type.post("/edit/:id",(request,response)=>{
   typeSchema.updateOne({_id:request.params.id},{
        $set:{
            header:request.body.Header
          
         }
    },(error)=>{
        if(!error)
        {
            response.redirect("/type/list");
        }
        else
        {
            console.log(error.message)
        }
    });
    }) 





 



module.exports=type;
