import React, { useState, useEffect } from "react";
import VolunteerPanel from '../VolunteerPanel';
import SetTimer from "../SetTimer";
import moment from "moment";

const Rentings = props => {
    const [rentings, setRentings] = useState([]);
useEffect(()=>{
      fetch("http://localhost:3000/rentings")
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        setRentings(data);
      })
    }, []);

    function magic(item){

     let rentingDuration = moment.duration (item.starting_time);
     const rentingDate = moment(item.renting_date);
     console.log(rentingDuration)
     console.log(rentingDate)
     console.log(item)
     const resultOfDuration = rentingDate.add(rentingDuration)
     return resultOfDuration;
    }


    function magicTwo(item){
      let renting_date = item.renting_date;
      
      return renting_date
    }

    // Date.prototype.addHours = function(h) {
    //   this.setTime = rentingDate + (h*60*60*1000);
    //   return this;
    // }
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
                                    <th></th>
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
                                    <td><SetTimer
                                    dueDate={magic(item)}
                                    /></td>
                                    <td>{item.conditions}</td>
                                    <td><button className="delete-button">Received</button></td>
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
