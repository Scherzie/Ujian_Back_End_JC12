const express=require('express')
const {Inventorycontrollers}=require('./../controllers')
const router=express.Router()

router.get('/getinventory',Inventorycontrollers.getinventory)
router.post("/addinventory", Inventorycontrollers.addinventory);
router.patch("/editinventory", Inventorycontrollers.editinventory);
router.delete("/deleteinventory", Inventorycontrollers.deleteinventory);

module.exports=router