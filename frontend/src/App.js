// import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from "./Components/Home/Home"
import Filter from './Components/Filter/Filter';
import RestaurantsDetails from './Components/Details/RestaurantsDetails';

function App() {
  return (
    <div>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/details/:rName" element={<RestaurantsDetails/>}/>
       <Route path='/filter/:itemname' element={<Filter/>}/>
       <Route path="/filter/Drinks/details/:rName" element={<RestaurantsDetails/>}/> 
      </Routes>
    
    </div>
  );
}

export default App;
