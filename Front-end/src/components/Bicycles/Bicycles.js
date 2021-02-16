import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VolunteerPanel from '../VolunteerPanel';
import SearchBicycle from "./SearchBicycle";

const AllBicycles = props => {
    const [bikes, setBikes] = useState([]);
useEffect(()=>{
      fetch("http://localhost:3000/bikes")
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        setBikes(data);
      })
    }, []);

    const search = searchVal => {
        console.info("TO DO!", searchVal);
        const filteredBicycles = bikes.filter(
          item => item.model_name === searchVal
        );
        setBikes(filteredBicycles);
      };
    

    return (
        <>
         <VolunteerPanel />
            <div className="wrapper">
                <div className="residents-wrapper">
                    <h2 className="text-center">Bicycles</h2>
                    <Link to={'/addnewbicycle'}>
                            <button className="mt-5 btn btn-primary w-100" type="submit">Add New Bicycle</button>
                        </Link>
                    <SearchBicycle search={search} />
                    {/* <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                         aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                        </span>
                    </div> */}
                    <div className="table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Model name</th>
                                    <th>Entry Date</th>
                                    <th>Conditions</th>
                                    </tr>
                                </thead>
                            <tbody>
                            {bikes.map((item, index) => (
                                    <tr key={index}>
                                    <td>{item.model_name}</td>
                                    <td>{item.entry_date}</td>
                                    <td>{item.conditions}</td>
                                    </tr>
                                ))} 
                           </tbody>
                        </table>
                    </div>
                    
                </div>
  </div>
</>)
}
export default AllBicycles;

