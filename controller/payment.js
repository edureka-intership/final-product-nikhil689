const Razorpay= require("razorpay")
const shortid = require("shortid");
let Transactions = require("../model/transaction")
const crypto = require('crypto')


var instance = new Razorpay({
    key_id:"rzp_test_RZHwsJuK3xV1nk",
    key_secret:"ZQriWaAxy51eRQSSFBhITKmd"
})

exports.createOrder=async(req,res)=>{
    let options={
        amount:req.body.amount *100,
        currency: "INR",
        receipt: shortid.generate(),
        notes: {
            key1: "value3",
            key2: "value2"
        }
    }
    try{
    const response= await instance.orders.create(options)
    console.log(response)
    res.json(response)
    }catch(error){
        console.log(error)
    }
}


exports.saveTransaction = (req,res)=>{
    console.log("saving Transaction....")
    const generated_signature = crypto.createHmac('sha256',instance.key_secret)
    
    generated_signature.update(req.body.razorpay_order_id+"|"+ req.body.razorpay_paymentid)
     if (generated_signature.digest('hex') == req.body.razorpay_signature){
           console.log("inside true")
            const transaction = new Transactions({
              transaction_id:req.body.razorpay_paymentid,
              transaction_amount:req.body.amount,
          });
          console.log(transaction)
          transaction.save(function(err, savedTransaction){
            if(err){
                console.log(err);
                return res.status(500).send("Some Problem Occured");
            }
            res.send({transaction: transaction});
  
        });
      // return res.send('success');
    }
    else{
      return res.send('failed');
    }
  }
