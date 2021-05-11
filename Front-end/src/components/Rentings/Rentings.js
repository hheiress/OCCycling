import React, { useState, useEffect, useReducer } from "react";
import VolunteerPanel from '../VolunteerPanel';
import Footer from '../Footer'
import SetTimer from "../SetTimer";
import moment from "moment";
import UpdateRenting from "./UpdateRenting";
import FilterRentings from "./FilterRentings";



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
    const [update, setUpdate] = useState(false)
    const [bikes, setBikes] = useState([]);

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
    }, [update]);

    // useEffect(()=> {console.log(rentings)}, [rentings])

   const sortedRentings = rentings.sort(
     (a,b)=>{
       return new Date(b.renting_date) - new Date(a.renting_date);}
   )
  //  const [station, setStation] = useState([]);

   const search = searchVal => {
    console.log(searchVal)
    console.info("new Filtered!", searchVal);
    const filteredStation = rentings.filter((item)=>{
      console.log("filteres",item)
      return item.station_name === searchVal
    });
     setRentings(filteredStation);
    };
   //get station 
  
  // create a function to bann the user in case of overtimming
  //  const bannTime= rentings.map(
  //    (user)=>{
  //    if((new Date(user.renting_date) - new Date(user.finished_date))> 4 ){
  //       return user.status="Banned"
  //    }
  //   })
 

    function magic(item){
      if(item.finished_date===null){
     let rentingDuration = moment.duration (item.starting_time);
     const rentingDate = moment(item.renting_date);
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
                    <FilterRentings search={search}/>
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
                                {sortedRentings.map((item, index) => {
                                  console.log(item)
                                  return(
                                  
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
                                    setUpdate={setUpdate}
                                    update={update} 
                                    params={item.id}
                                    model_name={item.model_name}
                                    name={item.name}
                                    last_name={item.last_name}
                                    /></td>
                                    <td>{item.finished_date}</td>
                                  </tr>
                                )})} 
          </tbody>
        </table>
      </div>
      </div>
  </div>
  <Footer />
</>)
}
export default Rentings;
