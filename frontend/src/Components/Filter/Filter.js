import React,{useState,useEffect} from 'react'
import '../../styles/Filter.css'
import Header from '../Common/Header'
import {useParams,Link} from 'react-router-dom'



export default function Filter() {

    const [location, setLocation] = useState([])
    const [currentPage, setCurrentpage] = useState(1)
    const [restaurants, setRestaurants] = useState([])
    const [place,setPlace] = useState("");
    const [setp,setSetp] = useState(false);
    const {itemname} = useParams();
    let type = itemname.toLocaleLowerCase(); 
    const[filter,setFilter]=useState({
        city_id:'',
        cuisine:[],
        lcost:'',
        hcost:'',
        sort:1,
        type:[type]
    })
    const[pagecount,setPagecount]=useState(0)

    const requestOptions={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(filter)
    }

  //call API
  useEffect(() => {
      fetch(`https://zomato689.herokuapp.com/restaurant/filter/${currentPage}`,requestOptions)
       .then(response=>response.json())
       .then(data => {
            setRestaurants(data.data)
            setPagecount(data.totalRecords/2)

       })
      }
  , [filter,currentPage])


  useEffect(()=>{
    fetch('https://zomato689.herokuapp.com/location',{method:'GET'})
    .then(response=>response.json())
    .then(data=>setLocation(data.data));
  },[])

//create location list 

const locationlist = location.length && location.map((items,index)=><option key={index} value={items.city_id} >{items.name}</option>); 

  //handlelocation
  const handlelocation=(e)=>{
    filter.city_id=e.target.value;
    console.log("filter.city_id : ",e);
    setFilter({...filter});
    fetch(`https://zomato689.herokuapp.com/restaurant/${e.target.value}`,{method:"GET"})
    .then(res=>res.json())
    .then(result=>{
      console.log("restaurants : ",result);
      setPlace(result.data[0].city_name);
      setSetp(true);
    })
   }
    const handleCuisineChange=(e)=>{
        // console.log(e)
        // console.log("event",e.target.name)
        if(e.target.checked)
          filter.cuisine.push(e.target.name)
        else
          {
              let index= filter.cuisine.indexOf(e.target.name)
              if(index >-1)
              filter.cuisine.splice(index,1)
          }  
       setFilter({...filter})

    }


    const handleCostChange=(lcost,hcost)=>{
        filter.lcost=lcost;
        filter.hcost=hcost;
        setFilter({...filter})
    }

    const handleSort=(s)=>{
      filter.sort=s;
      setFilter({...filter})
    }

   const paginationItems=[]
   for(let i=1;i<=pagecount;i++){
     paginationItems[i]= <a href="#" onClick={()=>setCurrentpage(i)}>{i}</a>
   }



    return (
        <div>
            <Header/>
            <div className="heading-filter">{itemname} Places {setp ?<span style={{ color: "#192F60",fontSize: " 33px"}}> in {place}</span>   : ""} </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <div className="filter-options">
                                <span className="glyphicon glyphicon-th-list toggle-span" data-toggle="collapse"
                                    data-target="#demo"></span>
                                <div id="demo" className="collapse show">
                                    <div className="filter-heading">Filters</div>
                                    <div className="Select-Location">Select Location</div>
                                    <select className="Rectangle-2236"  onChange={(e)=>handlelocation(e)} >
                                        <option >Select</option>
                                        {locationlist}
                                    </select>
                                    <div className="Cuisine">Cuisine</div>
                                    <div>
                                        <input type="checkbox" name='North Indian'  onChange={(e)=>handleCuisineChange(e)}/>
                                        <span className="checkbox-items">North Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="South Indain" onChange={(e)=>handleCuisineChange(e)} />
                                        <span className="checkbox-items">South Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="Chineese"  onChange={(e)=>handleCuisineChange(e)}/>
                                        <span className="checkbox-items">Chineese</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="Fast Food" onChange={(e)=>handleCuisineChange(e)}/>
                                        <span className="checkbox-items">Fast Food</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="Street Food" onChange={(e)=>handleCuisineChange(e)} />
                                        <span className="checkbox-items">Street Food</span>
                                    </div>
                                    <div className="Cuisine">Cost For Two</div>
                                    <div>
                                        <input type="radio" name="cost" onChange={()=>handleCostChange(1,500)} />
                                        <span className="checkbox-items">Less than &#8377; 500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={()=>handleCostChange(500,1000)}/>
                                        <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={()=>handleCostChange(1000,1500)} />
                                        <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={()=>handleCostChange(1500,2000)} />
                                        <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={()=>handleCostChange(2000,10000)} />
                                        <span className="checkbox-items">&#8377; 2000 +</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost"  onChange={()=>handleCostChange(1,10000)}/>
                                        <span className="checkbox-items">All</span>
                                    </div>
                                    <div className="Cuisine">Sort</div>
                                    <div>
                                        <input type="radio" name="sort" checked={filter.sort==1} onChange={()=>handleSort(1)} />
                                        <span className="checkbox-items">Price low to high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" checked={filter.sort==-1} onChange={()=>handleSort(-1)}/>
                                        <span className="checkbox-items">Price high to low</span> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                            <div className="col-sm-9 col-md-9 col-lg-9 scroll">
                             {
                                 restaurants.length > 0 ? restaurants.map((item,index)=>
                                 <div className="Item" key={index}>
                                     <Link to={`/filter/Drinks/details/${item.name}`} className="link">
                                 <div className="row pl-1">
                                     <div className="col-sm-4 col-md-4 col-lg-4">
                                         <img className="img" src={item.thumb} />
                                     </div>
                                     <div className="col-sm-8 col-md-8 col-lg-8">
                                         <div className="rest-name">{item.name}</div>
                                         <div className="res-location">{item.locality}</div>
                                         <div className="rest-address">{item.city_name}</div>
                                     </div>
                                 </div>
                                 <hr />
                                 <div className="row padding-left">
                                     <div className="col-sm-12 col-md-12 col-lg-12">
                                         <div className="rest-address">CUISINES : {item.cuisine.length && item.cuisine.map((item)=> item.name+' ')}</div>
                                         <div className="rest-address">COST FOR TWO : {item.cost} </div>
                                     </div>
                                 </div>
                                 </Link>
                             </div>

                                 ):<div className="noData"> No Data Found</div>
                             }
                            
                            </div>
                            <div>
                            <div className="pagination">
                                 <a href="#">&laquo;</a>
                                 {paginationItems}
                                 <a href="#">&raquo;</a>
                            </div>
                            </div>
                            
                        
                    </div>
                </div>
            </div >
    )
}
