const Restaurants = require('../model/restaurant.js')
// const fs=require("fs")



// exports.getAllRestaurant = (req, res) => {
//     res.status(200).json({
//         message: "restaurant fetched successfully ",
//         data: Restaurants
//     })
// }


exports.getAllRestaurant = (req, res) => {
    Restaurants.find()
        .then(
            result => {
                res.status(200).json({
                    message: "restaurant fetched successfully ",
                    data: result
                })
            }
        )
        .catch(error => {
            res.status(500).json({
                message: "error in database", error: error
            })
        })
}

exports.getRestaurantsByCity = (req, res) => {

    let filter = { city_name: req.params.cName }
    Restaurants.find(filter)
        .then(
            result => {
                res.status(200).json({
                    message: "restaurant fetched successfully ",
                    data: result
                })
            }
        )
        .catch(error => {
            res.status(500).json({
                message: "error in database", error: error
            })
        })



    // let filterRestaurants = Restaurants.filter((item) => item.City == req.params.cName)
    //     res.status(200).json({

    //         message: "restaurant fetched successfully By city name",
    //         data: filterRestaurants
    //     // }) :
    //     // res.status(200).json({

    //     //     message: "NO restaurant fetched By city name",

    //     // })
    // })
}

exports.getRestaurantByName = (req, res) => {
    let filter = { name: req.params.rName }
    Restaurants.findOne(filter)
        .then(
            result => {
                res.status(200).json({
                    message: "restaurant fetched successfully ",
                    data: result
                })
            }
        )
        .catch(error => {
            res.status(500).json({
                message: "error in database", error: error
            })
        })
}


exports.addRestaurant = (req, res) => {
    Restaurants.push(req.body)
    let rstring = JSON.stringify(Restaurants)

    // fs.writeFileSync('C:\Users\Desktop\Nodejs-express\model/restaurant.json',rstring)

    res.status(201).json({
        message: "Restaurant added succfully",
        data: Restaurants
    })
}


exports.updateRestaurant = (req, res) => {

    const index = Restaurants.findIndex((item) => item.name == req.body.name)

    Restaurants[index].City = req.body.City

    res.status(201).json({
        message: "Restaurant updated successfully",
        data: Restaurants
    })
}


exports.getRestaurantByFilter = (req, res) => {
    let filter = {}
    if (req.body.city_id) {
        filter.city = req.body.city_id
    }
    if (req.body.cuisine && req.body.cuisine.length > 0) {
        filter['cuisine.name'] = { $in: req.body.cuisine }
    }
    if(req.body.type && req.body.type.length > 0)
    {            
      filter["type.name"]={$in:req.body.type }
    }

    if (req.body.lcost && req.body.hcost) {
        if (req.body.lcost == 0) {
            filter.cost = { $lte: req.body.hcost }
        }
        else {
            filter.cost = {
                $lt: req.body.hcost,
                $gt: req.body.lcost
            }
        }
    }
    let sort = 1
    if (req.body.sort) {
        sort = req.body.sort
    }
    console.log(filter)
    Restaurants.find(filter).limit(2).skip(2 * (req.params.pageNo - 1)).sort({ cost: sort })
        .then(
            result => {
                console.log(result)
                Restaurants.find(filter).count((err, count) => {
                    if (err)
                        console.log(err)
                    else
                        res.status(200).json({
                            message: "restaurant fetched successfully ",
                            data: result,
                            totalRecords: count
                        })
                })
            })

        .catch(error => {
            res.status(500).json({
                message: "error in database", error: error
            })
        })

}

exports.getRestaurantsByCityID = (req, res) => {
    let filter = { city: req.params.cID }
    Restaurants.find(filter)
        .then(
            result => {
                res.status(200).json({
                    message: "restaurant fetched successfully ",
                    data: result
                })
            }
        )
        .catch(error => {
            res.status(500).json({
                message: "error in database", error: error
            })
        })
}



