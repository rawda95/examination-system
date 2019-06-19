let express=require("express"),
    router=express.Router(),
    multer=require("multer");

const Question=require("../models/question");
const checkAuthorization=require("../middleware/checked-auth")

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}
const storage=multer.diskStorage({
    destination:(request,file,cb)=>{
        const isVaild=MIME_TYPE_MAP[file.mimetype];
        let error=new Error("Invalid Mime Type");
        if(isVaild)
        {
            error=null;
        }
        cb(null,"backend/images");
    },
    filename:(request,file,cb)=>{
        const name=file.originalname.toLowerCase().split(' ').join("_");
        const extension=MIME_TYPE_MAP[file.mimetype];
        cb(null,name+'_'+Date.now()+ '.'+extension);

    }
});
router.post("",multer({storage:storage}).single("image"),(request,response,next)=>{
    const newQuestion=new Question({
        title:request.body.title,
        content:request.body.content
    });
    newQuestion.save().then(createdQuestion=>{
       response.status(201).json({
           messages:"Question added successfully",
           questionId:createdQuestion._id

           });
    });
  
});
router.put("/:id",checkAuthorization,(request,response)=>{
  const question=new Question({
   _id:request.body.id,
   title:request.body.title,
   content:request.body.content
  });
  Question.updateOne({_id:request.params.id},question)
  .then(result=>{
       console.log(result);
       response.status(200).json({messages:"Update successful"});
       
  });
});

router.get("",(request,response)=>{
//fetch data from database
Question.find()
   .then((documents=>{
       return response.status(200).json({
           messages:"fetch suceess",
           questions:documents
       });

   }));

 

  
});
router.get("/:id",(response,request)=>{
Question.findById(request.params.id).then(question=>{
  if(question){
       response.status(200).json(question)
  }
  else{
   response.status(404).json({message:"Question Not found"})


  }
})
});
//delete 
router.delete("/:id",checkAuthorization,(request,response)=>{
Question.deleteOne({_id:request.params.id}).then(result=>{
      console.log(result);
      response.status(200).json({message:"Question deleted"});

})
// console.log(request.params.id);
});


module.exports=router;