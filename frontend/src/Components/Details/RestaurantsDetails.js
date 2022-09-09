import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import { useParams } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../styles/Details.css'
import Modal from 'react-modal'


export default function RestaurantsDetails() {
    //hooks
    const [restaurant, setRestaurant] = useState({})
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
    const [menu, setMenu] = useState([])
    const [isUserDModalOpen, setIsUserDModalOpen] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)


    let { rName } = useParams()
    //LifeCycle hooks: CompountDidMount and compoutdidUpdate
    const fetchMenu = () => {
        fetch(`https://zomato689.herokuapp.com/menu/${rName}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setMenu(data.data))
    }

    const addItem = (item) => {
        let price = totalPrice + item.itemPrice;
        console.log("price", price)
        setTotalPrice(price);
        console.log(totalPrice)
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const openRazorPay = async () => {
        let OrderData;
        OrderData = await fetch("https://zomato689.herokuapp.com/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalPrice })
        }).then(resp => resp.json())

        console.log(OrderData)

        const options = {
            key: "rzp_test_RZHwsJuK3xV1nk",
            currency: OrderData.currency,
            amount: OrderData.amount,
            name: "Zomato-Food Delivery",
            description: "Wallet Transaction",
            order_id: OrderData.id,


            handler: function (response) {
                var values ={
                    razorpay_signature : response.razorpay_signature,
                    razorpay_order_id : response.razorpay_order_id,
                    razorpay_payment_id : response.razorpay_payment_id,
                    transactionamount : OrderData.amount,
                  }
                
                  fetch("https://zomato689.herokuapp.com/payment/transaction", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body:JSON.stringify(values)
                  }).then(resp=>{console.log(resp); })
                    .catch(e=>console.log("error occured during saving transaction",e))
               
            },

            prefill:{
                email: "nicagg68988@gmail.com",
                contact:"202-555-0183"
            }
        }
        const paymentWindow = new window.Razorpay(options);
        paymentWindow.open()
    }

    useEffect(() => {
        fetch(`https://zomato689.herokuapp.com/restaurant/details/${rName}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => setRestaurant(data.data))
    }, [])

    const { name, thumb, address, Cuisine, cost } = restaurant
    const cuisineList = !(Cuisine == undefined) && Cuisine.length && <ul>
        {Cuisine.map(item =>
            <li key={item.name}>
                {item.name}
            </li>
        )}

    </ul>

    return (
        <div>
            <Header />
            <div>
                <img src={thumb} height="400px" width="100%" />
            </div>
            <div>
                <h2>{name}
                    <button className="btn btn-danger" onClick={() => { fetchMenu(); setIsMenuModalOpen(true) }} style={{ float: 'right', margin: '15px', backgroundColor: '#ce0505', width:"20%" }}>Place Online Order</button></h2>
            </div>
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Overview</Tab>
                        <Tab>Contact</Tab>
                    </TabList>

                    <TabPanel>
                        <div className='about'>About the Place</div>
                        <div className='head'>Cuisine</div>
                        {cuisineList}
                        <div className='head'>average Cost</div>
                        <div className='value'>&#8377;{cost}</div>

                    </TabPanel>
                    <TabPanel>
                        <div className='head'>Phone Number</div>
                        <div >+91-123344564234</div>
                        <div className='head'>{name}</div>
                        <div className='value'>{address}</div>
                    </TabPanel>
                </Tabs>
            </div>
            <Modal isOpen={isMenuModalOpen} >
                <h2>
                    Menu
                    <button onClick={() => setIsMenuModalOpen(false)} className="btn btn-outline-danger float-end"  style={{ float: 'right', margin: '15px', backgroundColor: '#ce0505', width:"20%" , color:"white"}}>X</button>
                </h2>
                <h3>
                    {name}
                </h3>
                <ul className="">
                    {
                        menu.length &&
                        menu.map((item, index) => <li key={index}>
                            <div className="col-10">
                                <div>
                                    {
                                        item.isVeg ?
                                            <div className="text-success fs-6">Veg</div> :
                                            <div className="text-danger fs-6">Non-veg</div>
                                    }
                                </div>
                                <div className="cuisines"> {item.itemName} </div>
                                <div className="cuisines">&#8377;{item.itemPrice}</div>
                                <div className="cuisines">{item.itemDescription}</div>
                            </div>
                            <div className="col-2">
                                <button className="btn btn-primary" onClick={() => addItem(item)}>Add</button>
                            </div>
                        </li>)
                    }
                </ul>
                <hr />
                <h3>Total Price:{totalPrice}</h3>
                <button className='btn btn-danger' style={{ float: "right" }} onClick={() => { setIsMenuModalOpen(false); loadScript("https://checkout.razorpay.com/v1/checkout.js"); openRazorPay() }}>Pay Now</button>
                {/* <button onClick={()=>{loadScript("https://checkout.razorpay.com/v1/checkout.js");openRazorPay()}}>Proceed</button> */}
            </Modal>
        </div>
    )
}
