const express = require("express");
const cors = require('cors')

const mongoose = require("mongoose");
const app = express();

const dotenv = require("dotenv") 
 dotenv.config();
app.use(express.json());
 app.use(cors({origin: true, credentials: true}));

 
 
const connect =  async() => {
try  {
    return  mongoose.connect(
        "mongodb+srv://kritika176:kritika@cluster0.4hoe3.mongodb.net/blog?retryWrites=true&w=majority"
     )
}
catch(err){
    console.log("connection error")
}
    }
const registerController = require("./controllers/register.controller");
const loginController = require("./controllers/login.controller");
const postController = require("./controllers/post.controller");

app.get('/', (req, res) => {
    res.send('This is blog backend server')
})

app.use("/register",registerController);
app.use("/login",loginController);
app.use("/post",postController);

app.listen(process.env.PORT||8080,async() => {
    try{
      await  connect();
        console.log("connected to port 8080")
    }
    catch(err){
        console.log(err.message)
    }
})