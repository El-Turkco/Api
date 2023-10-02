const jwt =require("jsonwebtoken")

//Middleware CREATE

//Token Create and token validation
module.exports=function auth(req,res,next){
    const token = req.header("x-auth-token");

    if(!token){
        return res.status(401).send("Unauthorized");
    }
    try{
        const decodedToken=jwt.verify(token,"jwtPrivatekey");
        req.user= decodedToken;
        next();
    }
    catch(ex){
        return res.status(500).send("Not a token");
    }
    
}

