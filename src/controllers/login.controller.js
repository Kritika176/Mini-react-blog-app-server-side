
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
 
dotenv.config();
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
var newToken = (user) => {
    return jwt.sign({ user }, "kritika176");
  };

  router.post("",async (req, res) => {
    try {
      // console.log(req.body);
     
      const user = await User.findOne({ email: req.body.email });
     
  
      if (!user) {
        return res.send({ message: "Either email or password is incorrect" });
      }
      const match = user.checkPassword(req.body.password);
      if (!match) {
        return res.send({ message: "Either email or password is incorrect" });
      }
      const Token = newToken(user);

      return(res.send({token:Token,id:user._id}))
    } catch (err) {
      res.send({ msg: err.message });
    }
  }) ;

  module.exports = router;