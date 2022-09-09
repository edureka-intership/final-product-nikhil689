import React, { Component } from 'react'
import wallpaper from '../../Assets/homepageimg.png'
import '../../styles/Wallpaper.css'
import { Link } from 'react-router-dom';

export default class Wallpaper extends Component {

    constructor() {
        super();
        this.state = {
            locations: [],
            restaurants: []
        }
    }

    componentDidMount() {
        fetch('https://zomato689.herokuapp.com/location', { method: 'GET' })
            .then(response => response.json())
            .then(data => this.setState({ locations: data.data }))
    }
    fetchRestaurants = (event) => {
        console.log(event.target.value)
        fetch(`https://zomato689.herokuapp.com/restaurant/${event.target.value}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => this.setState({ restaurants: data.data }))
    }

    render() {
        console.log(this.state.restaurants)
        const locationList = this.state.locations.length && this.state.locations.map(item => <option key={item.name} value={item.city_id}>{item.name}</option>)
        const restaurantList = this.state.restaurants.length &&
            <ul>
                {
                    this.state.restaurants.map(item =>
                        <li key={item.name} >
                            { <Link to={`/details/${item.name}`}  style={{textDecoration:"none" , color: "grey"}}>
                      {item.name}
                  </Link> }

                        </li>

                    )
                }
            </ul>
        return (

            <div>
                <div>
                    <img src={wallpaper} width='100%' height='450' />

                    <div className="logo">
                        <p>e!</p>
                    </div>
                    <div className="headings">
                        Find the best restaurants, cafes, bars
                    </div>
                    <div className="locationSelector">
                        <select className="locationDropdown" onChange={this.fetchRestaurants}>
                            <option value="0">select</option>
                            {locationList}
                        </select>
                        <div id="notebooks">
                            <input className="restaurantsinput" type="text" placeholder="Search Restaurant on" />
                            {restaurantList}
                            {/* <span className="glyphicon glyphicon-search search"></span> */}
                        </div>

                    </div>
                </div >
            </div>
        )
    }
}