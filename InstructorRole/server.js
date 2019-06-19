let http=require('http');
let app=require('./backend/app');
let port=3000;
app.set('port',port)
let server=http.createServer(app);
server.listen(port,()=>{
    console.log("I am Listening ............");
});
 
// let port=process.port||8090
// server.listen(port,()=>{
//     console.log("I am Listening ............")
// });
// module.exports=app;