import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterRenters from "./FilterRenters"
import VolunteerPanel from '../VolunteerPanel';

function RentBicycle() {
    const [bikes, setBikes] = useState([]);
useEffect(()=>{
      fetch("http://localhost:3000/bikes")
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        setBikes(data);
      })
    }, []);

    return (
    <div>
        <VolunteerPanel />
            <div className="wrapper">
                <div className="residents-wrapper">
                    <h2 className="text-center">Rent a Bicycle</h2>
                    <div className="search-fbox">
                        <FilterRenters />
                    </div> 
                    <div>
                    <h4 className="bicycle-rent">Choose Bicycle</h4>
                        <select className="select">
                            {bikes.map((item, index)=> (
                            <option key={index}>{item.model_name}</option>))} 
                        </select>;
                        <Link to={'/addtime'}>
                            <button className="mt-5 btn btn-primary w-100" type="submit">Assign Time</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentBicycle;
