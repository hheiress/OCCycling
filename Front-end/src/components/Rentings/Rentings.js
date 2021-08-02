import React, { useState, useEffect, useReducer } from "react";
import VolunteerPanel from '../VolunteerPanel';
import Footer from '../Footer'
import SetTimer from "../SetTimer";
import moment from "moment";
import UpdateRenting from "./UpdateRenting";
import FilterRentings from "./FilterRentings";
import BannUser from "./BannUser"
import ExportRentings from "./ExportRentings";
import FilterByDate from "./FilterByDate"
import CurrentRentings from "./CurrentRentings";

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
    const [rentings, setRentings] = useState([]);
    const [update, setUpdate] = useState(false);
    const [filteredRentings, setFilteredRentings] = useState(null);
    const [filteredDay, setFilteredDay] = useState(null);

    useEffect(()=>{
      fetch("http://localhost:3000/rentings",{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => res.json())
      .then((data) => {
        data = data.filter(
          item => item.finished_date !== null
      );
        setRentings(data);
      })
    }, [update]);

   const sortedRentings = rentings.sort(
     (a,b)=>{
       return new Date(b.renting_date) - new Date(a.renting_date);}
   )

   const search = searchVal => {
    const filteredStation = sortedRentings.filter((item)=>{
      return item.station_name === searchVal
    });
    console.log(filteredStation)
     setFilteredRentings(filteredStation);
    };

    const filterByDay = searchDay => {
      const filteredDay = sortedRentings.filter(
        item => item.renting_date.slice(0,10) === searchDay
      );
       console.log("searchDay:"+ searchDay, "FILTEREDdAY:" + filteredDay)
        console.log(filteredDay)
        setFilteredRentings(filteredDay);
      };

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
                  <div className="headerExport">
                    <h2 className="text-center">Rentings</h2>
                    <ExportRentings />
                  </div>
                  <div className="filters-rentings"> 
                      <FilterRentings search={search}/>
                      <FilterByDate searchDay={filterByDay}/>
                  </div>
                  <CurrentRentings/>
                    <div className="table">
                      <h3>All Rentings</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Bicycle ID</th>
                                    <th>User name</th>
                                    <th>Renting date</th>
                                    <th>Station</th>
                                    {/* <th>Time left</th> */}
                                    <th>Condition</th>
                                    {/* <th></th> */}
                                    <th>Finished date</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {filteredRentings?.length > 0 ? filteredRentings.map((item, index) => {
                                  return(
                                    <tr key={index}>
                                    <td>{item.model_name}</td>
                                    <td>{item.name} {item.last_name}</td>
                                    <td>{item.renting_date.slice(0,19)}</td>
                                    <td>{item.station_name}</td>
                                    {/* <td><SetTimer
                                    dueDate={magic(item)}
                                    /></td> */}
                                    <td>{item.conditions}</td>
                                    {/* <td><UpdateRenting
                                    setUpdate={setUpdate}
                                    update={update} 
                                    params={item.id}
                                    model_name={item.model_name}
                                    name={item.name}
                                    last_name={item.last_name}
                                    />
                                    <BannUser user_id={item.user_id}/>
                                    </td> */}
                                    <td>{item.finished_date}</td>
                                  </tr>
                                )
                              })
                                :
                                sortedRentings.map((item, index) => {
                                  return(
                                    <tr key={index}>
                                    <td>{item.model_name}</td>
                                    <td>{item.name} {item.last_name}</td>
                                    <td>{item.renting_date.slice(0,19)}</td>
                                    <td>{item.station_name}</td>
                                    {/* <td><SetTimer
                                    dueDate={magic(item)}
                                    /></td> */}
                                    <td>{item.conditions}</td>
                                    {/* <td><UpdateRenting
                                    setUpdate={setUpdate}
                                    update={update} 
                                    params={item.id}
                                    model_name={item.model_name}
                                    name={item.name}
                                    last_name={item.last_name}
                                    />
                                    <BannUser user_id={item.user_id}/>
                                    </td> */}
                                    <td>{item.finished_date}</td>
                                  </tr>
                                )})
                              } 
          </tbody>
        </table>
      </div>
      </div>
  </div>
  <Footer />
</>)
}
export default Rentings;
