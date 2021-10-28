import React, { useState, useEffect, useReducer } from "react";
import VolunteerPanel from '../../VolunteerPanel';
import './Rentings.css'
import Footer from '../../Footer'
import moment from "moment";
import FilterRentings from "../Filters/FilterRentings";
import ExportRentings from "./ExportRentings";
import FilterByDate from "../Filters/FilterByDate"
import CurrentRentings from "./CurrentRentings";
import paginationFactory from "react-bootstrap-table2-paginator";
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";
import RentingTable from "./RentingTable";

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

    const url = `/rentings`;
    useEffect(()=>{
      dynamicGetFetch(url) 
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
      return item.location_end_name === searchVal
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
                      <RentingTable
                        filteredRentings={filteredRentings} 
                        sortedRentings={sortedRentings}/> 
                        {/* <table className="table" pagination={pagination}>
                            <thead>
                                <tr>
                                    <th>Bicycle Number</th>
                                    <th>Model name</th>
                                    <th>User name</th>
                                    <th>Renting date</th>
                                    <th>Start Station</th>
                                    <th>Finish Station</th>
                                    <th>Condition</th>
                                    {/* <th></th> */}
                                    {/* <th>Finished date</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {filteredRentings?.length > 0 ? filteredRentings.map((item, index) => {
                                  return(
                                    <tr key={index}>
                                    <td className="id-number">{item.bike_number}</td>
                                    <td>{item.model_name}</td>
                                    <td>{item.name} {item.last_name}</td>
                                    <td>{item.renting_date.slice(11,19)}{item.renting_date.slice(0,10)}</td>
                                    <td>{item.location_start_name}</td>
                                    <td>{item.location_end_name}</td>
                                    <td>{item.conditions}</td>
                                    <td>{item.finished_date.slice(11,19)} <br/> {item.finished_date.slice(0,10)}</td>
                                  </tr>
                                )
                              })
                                :
                                sortedRentings.map((item, index) => {
                                  return(
                                    <tr key={index}>
                                    <td className="id-number">{item.bike_number}</td>
                                    <td>{item.model_name}</td>
                                    <td>{item.name} {item.last_name}</td>
                                    <td>{item.renting_date.slice(11,19)} <br/> {item.renting_date.slice(0,10)}</td>
                                    <td>{item.location_start_name}</td>
                                    <td>{item.location_end_name}</td>
                                    <td>{item.conditions}</td>
                                    <td>{item.finished_date.slice(11,19)} <br/> {item.finished_date.slice(0,10)}</td>
                                  </tr>
                                )})
                              } 
          </tbody>
        </table> */} 
      </div>
      </div>
  </div>
  <Footer />
</>)
}
export default Rentings;
