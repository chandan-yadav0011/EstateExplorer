import React, { useState } from 'react';
import './SearchBar.scss';
import { Link } from "react-router-dom";


const types=["buy", 'rent'];

function SearchBar(props) {

    //here we created a state variable that will store our form data including the type of the button that is buy or rent 

    const [query,setQuery] = useState({
        type:"buy",
        location:"",
        minPrice:0,
        maxPrice:0,
    });
    
    const switchHandler=(value)=>{
         setQuery((prev)=>({...prev,type:value}));
    }
    

    const handleChange = (e) => {
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className='searchBar'>
        
            <div className='type'>

                {
                    types.map((type)=>(
                        <button key={type} 
                            onClick={()=>switchHandler(type)}  
                            className= {query.type === type ? "active":""}
                        >
                            {type}
                        </button>
                    ))
                }
               
                <form>
                    <input type="text" name="location" placeholder='City Location'
                         onChange={handleChange}
                    />
                    <input type="number" name="minPrice" min={0} max={10000000} placeholder='Min Price'
                         onChange={handleChange}
                    />
                    <input type="number" name="maxPrice" min={0} max={10000000} placeholder='Max Price'
                         onChange={handleChange}
                    />
                  
                  <a
                        // to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
                        >
                        <button>
                            <img src="/search.png" alt="" />
                        </button>
                    </a>
                </form>

            </div>
        </div>
    );
}

export default SearchBar;