const express=require("express");
// const slashroutes=require('./routes/slash');
const resturantRoutes=require('./routes/restaurant')
const locationRoutes=require("./routes/location")
const menuRoutes=require("./routes/menu")
const paymentRoutes=require("./routes/payment")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const mealTypeRoutes=require('./routes/mealType.js')
const cors=require("cors")


const PORT=process.env.PORT ||9091
const DBSTRING="mongodb+srv://root:root@cluster0.c410x.mongodb.net/zomato"
// "mongodb://127.0.0.1/Zomato"

mongoose.connect(DBSTRING,()=>{
    console.log("mongoDB connnected successfully")
},
e=>console.log("error occured while connecting to DB:",e))

var app=express();


app.use(cors())
app.use(bodyParser.json())
// app.use("",slashroutes)
app.use('/restaurant',resturantRoutes) 
app.use("/location",locationRoutes)
app.use('/mealType',mealTypeRoutes)
app.use("/menu",menuRoutes)
app.use("/payment",paymentRoutes)

if(process.env.NODE_ENV=="production"){
    app.use(express.static("frontend/build"));
    const path=require("path")
     app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend" , "build" , "index.html"))
     })
}

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
});