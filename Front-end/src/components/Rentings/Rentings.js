import React, { useState, useEffect, useReducer } from "react";
import VolunteerPanel from '../VolunteerPanel';
import Footer from '../Footer'
import SetTimer from "../SetTimer";
import moment from "moment";
import UpdateRenting from "./UpdateRenting";

const rentingForm = (state, event) => {
  if (event.reset) {
    return {
      starting_time:null,
      finished_date: '',
    }
    
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

const Rentings = props => {
    const [submitting, setSubmitting] = useState(false);
    const [rentings, setRentings] = useState([]);
    useEffect(()=>{
      fetch("http://localhost:3000/rentings",{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        setRentings(data);
      })
    }, []);

    // const handleSubmit = event => {
    // fetch("http://localhost:3000/rentings/rentings.id}", {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(renting), 
    // })
    // .then((response) => response.json())
    // .then((result) => {
    //   console.log('Success:', result);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // })  
  //   setTimeout(() => {
  //     alert("Bike Received");
  //     setSubmitting(false);
  //   }, 500);
  // }
  
   const sortedRentings = rentings.sort(
     (a,b)=>{
       return new Date(b.renting_date) - new Date(a.renting_date);}
   )
    function magic(item){
      if(item.finished_date===null){
     let rentingDuration = moment.duration (item.starting_time);
     const rentingDate = moment(item.renting_date);
     console.log(rentingDuration)
     console.log(rentingDate)
     console.log(item)
     const resultOfDuration = rentingDate.add(rentingDuration)
     return resultOfDuration;
    }
  }
    

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
                                    <th>Renting date</th>
                                    <th>Station</th>
                                    <th>Time left</th>
                                    <th>Condition</th>
                                    <th></th>
                                    <th>Finished date</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {sortedRentings.map((item, index) => (
                                    <tr key={index}>
                                    <td>{item.model_name}</td>
                                    <td>{item.name} {item.last_name}</td>
                                    <td>{item.renting_date}</td>
                                    <td>{item.station_name}</td>
                                    <td><SetTimer
                                    dueDate={magic(item)}
                                    /></td>
                                    <td>{item.conditions}</td>
                                    <td><UpdateRenting 
                                    params={item.id}
                                    name={item.name}
                                    last_name={item.last_name}
                                    /></td>
                                    <td>{item.finished_date}</td>
                                  </tr>
                                ))} 
          </tbody>
        </table>
      </div>
      </div>
  </div>
  <Footer />
</>)
}
export default Rentings;
