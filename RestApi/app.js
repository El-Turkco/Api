const express= require("express");
const bodyParser = require('body-parser');
const User = require("./models/user");
const joi=require("joi");
const session = require('express-session');
const jwt =require("jsonwebtoken")
const productRouter =require("./routes/products");
const authRouter =require("./routes/auth");


app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret:"hAmVj1l6lT75Ujputg8TcjLozFl+DS+S4/1fCGYF0VcP9la/TLAQ/K3op9Wvu0Oj",
    resave:false,
    saveUninitialized:true,
    isAuth:false
}));

//Routers
app.use("/api/products",productRouter);
app.use("/api/user/",authRouter);

app.use("/",function(req,res){
    res.send("MainPage")
});

app.listen(3000,function(){
    console.log("Server Starded")
});

