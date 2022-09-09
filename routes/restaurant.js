const express=require('express')
const restaurantController=require('../controller/restaurant.js')

const router=express.Router()


router.get("",restaurantController.getAllRestaurant)
// router.get("/:cName",restaurantController.getRestaurantsByCity)
router.get("/:cID",restaurantController.getRestaurantsByCityID)
router.get('/details/:rName',restaurantController.getRestaurantByName)

router.post("",restaurantController.addRestaurant)
router.put("",restaurantController.updateRestaurant)
router.post("/filter",restaurantController.getRestaurantByFilter)
router.post("/filter/:pageNo",restaurantController.getRestaurantByFilter)

// router.post("",(req,res)=>{
//     res.send("You Have called restaurant route post method")
// })

// router.put("",(req,res)=>{
//     res.send("You Have called restaurant route PUT  method")
// })

// router.delete("",(req,res)=>{
//     res.send("You Have called restaurant route DELETE method")
// })


module.exports=router;
