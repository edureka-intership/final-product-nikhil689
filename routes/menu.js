const express=require('express')
const menuController=require('../controller/menu.js')

const router=express.Router()

router.get("/:rName",menuController.getAllMenu)


module.exports=router;