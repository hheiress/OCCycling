import React, { useState, useEffect } from "react";
import VolunteerPanel from '../VolunteerPanel';
import { Link } from "react-router-dom";
import Search from "../Residents/Search";

const Rentings = props => {
    const [rentings, setRentings] = useState([]);
useEffect(()=>{
      fetch("http://localhost:3001/rentings")
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        setRentings(data);
      })
    }, []);

    return (
        <>
         <VolunteerPanel />
            <div className="wrapper">
                <div className="residents-wrapper">
                    <h2 className="text-center">Rentings</h2>
                    <div className="table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Bicycle ID</th>
                                    <th>User name</th>
                                    <th>Status</th>
                                    <th>Renting date</th>
                                    <th>Station</th>
                                    <th>Time left</th>
                                    <th>Condition</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {rentings.map((item, index) => (
                                    <tr key={index}>
                                    <td>{item.model_name}</td>
                                    <td>{item.name}</td>
                                    <td>{item.status}</td>
                                    <td>{item.renting_date}</td>
                                    <td>{item.station_name}</td>
                                    <td>{item.time_left}</td>
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
export default Rentings;
