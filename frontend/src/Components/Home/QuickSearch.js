import React, { Component } from 'react'
import '../../styles/Quicksearch.css'
import Mealtype from './Mealtype'

export default class QuickSearch extends Component {

    constructor(){
        super()
        this.state={
            mealtypes:[]
        }
    }

    componentDidMount(){
        fetch('https://zomato689.herokuapp.com/mealtype',{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({mealtypes:data.data}))
    }
    render() {
        
        const mealtypesList=this.state.mealtypes.length && this.state.mealtypes.map(item=><Mealtype item={item} key={item.name}></Mealtype>)
         return (
             <div>
             <div className="quicksearch">
                 <p className="quicksearchHeading">
                     Quick Searches
                     </p>
                 <p className="quicksearchSubHeading">
                     Discover restaurants by type of meal
                     </p>
                 <div className="container-fluid">
                     <div className="row">
                        {mealtypesList}
                         </div>
                     </div>
                 </div>
             </div>
        
         )
     }
}