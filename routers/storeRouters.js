const express=require('express')
const {Storecontrollers}=require('./../controllers')
const router=express.Router()

router.get('/getstore',Storecontrollers.getstore)
router.post("/addstore", Storecontrollers.addstore);
router.patch("/editstore", Storecontrollers.editstore);
router.delete("/deletestore", Storecontrollers.deletestore);

module.exports=router