const express= require("express");
const Products = require("../models/products");
const router = express.Router();
const auth=require("../middleware/auth_orm");
const joi=require("joi");

//Get The create product request
router.post("/create",auth,async(req,res)=>{
    //User input is received here
    productsData={
        name:req.body.name,
        description:req.body.description,
        price:req.body.price
    }
    //Validation here
    const schema=new joi.object({
        name:joi.string().min(3).max(30).required(),
        description:joi.string().min(3).max(30).required(),
        price:joi.number().required()
    });
    const result=schema.validate(req.body)
    //validation check
    if (result.error){
        return res.status(400).send(result.error);
    }

    //product Checkk
    try{
        const productCheck = await Products.findOne({
            where:{
                name:productsData.name
        }   
        });
        
        if(productCheck){
            return res.status(400).send("this product already exists");
         }
         await Products.create({
             name: productsData.name,
             description:productsData.description,
             price:productsData.price
         });
         
         return res.status(200).send(req.body.name+" "+req.body.description+" "+ req.body.price);
    }catch(err){
      return res.status(500).send("Server Error");
    }
});

//Get The product request
router.get("/:id",auth,async(req,res)=> {

    idCheck= await Products.findOne({
        where:{
            id: req.params.id
        },      
    });
    if(!idCheck){
        return res.status(404).send("Not found"+" " + "id" +" " + req.params.id)
    }
    // get the product
    value= await Products.findOne({
        where:{
            id:req.params.id
        }    
    });

    return res.status(200).send(value);
    
});
//Get The product delete request
router.delete("/delete/:id",auth,async(req,res)=>{
    if(!req.method== 'DELETE'){
        return res.status(400).send("unaccepted request");
    }
    //id Check
    idCheck= await Products.findOne({
        where:{
            id:req.params.id
        }        
    })
    if(!idCheck){
        return res.status(404).send("Not found"+" " + req.params.id +" " + "id")
    }
    //product delete 
    await Products.destroy({
        where:{
            id:req.params.id
        }
    })
    return res.status(200).send("Deletion successful")
    

});


module.exports=router;