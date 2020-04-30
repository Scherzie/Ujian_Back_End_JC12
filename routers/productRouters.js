const express=require('express')
const {Productcontrollers}=require('./../controllers')
const router=express.Router()

router.get('/getproducts',Productcontrollers.getproducts)
router.post("/addproduct", Productcontrollers.addproduct);
router.patch("/editproduct", Productcontrollers.editproduct);
router.delete("/deleteproduct", Productcontrollers.deleteproduct);

module.exports=router