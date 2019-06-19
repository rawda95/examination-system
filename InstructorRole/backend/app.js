let experss=require("express"),
body_parser=require("body-parser"),
mongoose=require("mongoose");
const postsRoutes=require("./Routes/questions");
const userRoutes=require("./Routes/user");



let app=experss();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
mongoose.connect("mongodb://localhost:27017/ExamintaionProjectWithNlp")
.then(()=>{
    console.log("connected to database");
})
.catch(()=>{
   console.log("connected failed");
});
//solve cors
app.use((request,response,next)=>{
    response.setHeader("Access-Control-Allow-Origin","*" );
    response.setHeader("Access-Control-Allow-Headers",
                        "Origin,X-Requsted-With,Content-Type,Accept,Authorization");
     response.setHeader("Access-Control-Allow-Methods",
                         "GET,POST,PATCH,DELETE,PUT,OPTIONS");

    next();

});

app.use("/api/questions",postsRoutes);
app.use("/api/user",userRoutes);


module.exports=app;