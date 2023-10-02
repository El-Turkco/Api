const express= require("express");
const router = express.Router();
const joi=require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt =require("jsonwebtoken")

//Get The user create request
router.post("/create",async (req,res)=>{
    try{
        userData={
            name:req.body.name,
            password:req.body.password
        }
        //validation
        const schema=new joi.object({
            name:joi.string().min(3).max(30).required(),
            password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        });

        //validation check
        const result=schema.validate(req.body);
        if (result.error){
            res.status(400).send(result.error);
            return;
        }

        //Password Hashed
        const hashedPassword= await bcrypt.hash(req.body.password,10);
       
        // Name Check
        const namecheck= await User.findOne({
            where:{
                name:userData.name
            }
        })
        if(namecheck){
            return res.status(400).send(req.body.name+" "+ "This user is already registered")
        }
        //Add a user to the database
        await User.create({
            name: userData.name,
            password:hashedPassword    
        });
        
        //Token created
        const token= jwt.sign({id:User.id},'jwtPrivatekey');

        //Sending the token to the header
        return res.header("x-auth-token",token).send(userData.name+ " " +"Registerded successful");

      
    }
    catch(err){
        console.log(err)
    } 
});

//Get The user login request
router.post("/login",async function(req,res){
    userData={
        name:req.body.name,
        password:req.body.password
    }
    try{
        const user= await User.findOne({
            where:{
                name:userData.name,
            }
        });
        //userCheck 
        if(!user){
            return res.status(400).send("useralready exists");
        }
        //Password Check
        const match= await bcrypt.compare(userData.password,user.password);
        if(match){
            const token= jwt.sign({id:user.id},"jwtPrivatekey");

            return res.status(200).send(token)
        }
    }catch(err){
        console.log(err);
    }
});

//Get The profil request
router.use("/profil",function(req,res){
    if (!session.isAuth){
        return res.status(400).send("Not session");
    }
    return res.send("Login Successful");
});


module.exports = router;