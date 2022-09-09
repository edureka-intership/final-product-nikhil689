import React from 'react'
import { Link } from 'react-router-dom'

export default function Mealtype(props) {
  return (
    <div className="col-sm-12 col-md-12 col-lg-4">
      <div className="tileContainer">
        <div className="tileComponent1">
        <Link to ={`/filter/${props.item.name}`} className="mealtype">
          
            <img src={require('../../' + props.item.image)}
              height="150" width="140" />
          </Link> 
          {/* <Link to="/filter">
            <img src={require('../../' + props.item.image)}
              height="150" width="140" />
          </Link> */}
          {/* <img src={require('../../'+props.item.image)} 
         height="150" width="140" /> */}
        </div>
        <div className="tileComponent2">
          <div className="componentHeading">
            {props.item.name}
          </div>
          <div className="componentSubHeading">
            {props.item.content}
          </div>
        </div>
      </div>
    </div>
  )
}
