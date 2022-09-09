const express=require('express')
const mealTypeController=require('../controller/mealType.js')

const router=express.Router()

router.get("",mealTypeController.getAllmealType)


module.exports=router;