const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const {body,validationResult} = require("express-validator")
router.post("",[body("username").isLength({min:3}),
    body("email").isEmail().isLength({min:8}),
    body("password").isLength({min:3}),
    body("email").custom(async value => {
        const user = await User.findOne({email:value});
        if(user)
        {
            throw new Error("Email already exists");
        }
        return true;
    }),
    body("password").custom(async value => {
        const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if(pattern.test(value) == false)
        {
            throw new Error("Password is not strong ");
        }
        return true;
    })
],async(req,res)=> {
  
   try{
       const errors = validationResult(req.body);
       if(!errors.isEmpty())
       {
           return res.status(400).send({errors:errors.array()});
       }
       let user = await User.findOne({email:req.body.email}).lean().exec();
       if(user)
       {
           return res.send("User already exists")
       }
       user = await User.create({
           username:req.body.username,
           email:req.body.email,
           password:req.body.password
       })
       return res.status(200).send(user);
   }
   catch(err){
       res.status(400).send({msg:err.message})}
})

module.exports = router;