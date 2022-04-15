const express = require("express");
var cors = require('cors')
const multer = require("multer");
const app = express();
const path = require("path");
app.use(express.json());
 app.use(cors({origin: true, credentials: true}));
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"./images")
    },filename:(req,file,cb) =>{
        cb(null,req.body.name)
    }
});
const upload = multer({storage:storage})
app.post("/single",upload.single("file"),(req,res) =>{
    return res.send("File uploaded")
})
 
 
const connect = require('./configs/db');
const registerController = require("./controllers/register.controller");
const loginController = require("./controllers/login.controller");
const postController = require("./controllers/post.controller");


app.use("/register",registerController);
app.use("/login",loginController);
app.use("/post",postController);
app.use("/images",express.static(path.join(__dirname,"/images")))
app.listen(8080,async() => {
    try{
      await  connect();
        console.log("connected to port 8080")
    }
    catch(err){
        console.log(err.message)
    }
})