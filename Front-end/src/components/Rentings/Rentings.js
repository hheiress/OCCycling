import React, { useState, useEffect, useReducer } from "react";
import VolunteerPanel from '../VolunteerPanel';
import Footer from '../Footer'
import SetTimer from "../SetTimer";
import moment from "moment";
import StopRenting from "./StopRenting";

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
        },})
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        setRentings(data);
      })
    }, []);

    const [renting, updateRenting] = useReducer(rentingForm, {});

    const handleSubmit = event => {
      const today =  new Date().toString().slice(4, 25);
      console.log(today)
       const renting = { 
        "starting_time": null,
        "finished_date": today
       }
    console.log(renting) 
    event.preventDefault();
    setSubmitting(true);
    fetch("http://localhost:3000/rentings/rentings.id}", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(renting), 
    })
    // .then((response) => response.json())
    // .then((result) => {
    //   console.log('Success:', result);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // })  
    setTimeout(() => {
      alert("Bike Received");
      setSubmitting(false);
    }, 500);
  }

    function magic(item){

     let rentingDuration = moment.duration (item.starting_time);
     const rentingDate = moment(item.renting_date);
     console.log(rentingDuration)
     console.log(rentingDate)
     console.log(item)
     const resultOfDuration = rentingDate.add(rentingDuration)
     return resultOfDuration;
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
                                    <th>Status</th>
                                    <th>Renting date</th>
                                    <th>Station</th>
                                    <th>Time left</th>
                                    <th>Condition</th>
                                    <th></th>
                                    <th>Finished date</th>
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
                                    <td><StopRenting onClick={handleSubmit}/></td>
                                    <td >{item.finished_date}</td>
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
