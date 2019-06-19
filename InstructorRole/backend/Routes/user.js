let express=require("express"),
    router=express.Router(),
    bcrypt=require("bcrypt"),
    jwt=require("jsonwebtoken");
const User=require("../models/user");

router.post("/signUp",(request,response)=>{
    bcrypt.hash(request.body.password,10)
    .then(hash=>{
        const user=new User({
            userName:request.body.userName,
            email:request.body.email,
            password:hash,
            confirmPassword:request.body.confirmPassword
    });
    user.save()
        .then(result=>{
            response.status(201).json({
                message:"User Created",
                result:result
            });
        })
        .catch(err=>{
            response.status(500).json({
                error:err
            })
        })
});

       
});

router.post("/login",(request,response)=>{
    let fetchedUser;
    User.findOne({email:request.body.email})
    .then(user=>{
        console.log(user);
        if(!user)
        { 
            return response.status(401).json({
              message:"Auth Fialed"  
            })
        }
        fetchedUser=user;
       return bcrypt.compare(request.body.password,fetchedUser.password);
    })
    .then(result=>{
            if(!result){
                return response.status(401).json({
                message:"Auth Fialed"  
            });
            }
            const tokenn=jwt.sign(
                {email:fetchedUser.email,userId:fetchedUser._id}
                ,'secret_this_should_be_longer'
                ,{expiresIn:"1h"});
            response.status(200).json({
                token:tokenn,
                expiresIn:3600
            })
    })
    .catch(err=>{
        return response.status(401).json({
            message:"Auth Fialed"  
        });
    })
});
module.exports=router;
