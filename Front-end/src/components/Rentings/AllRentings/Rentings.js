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

const applyFilters = (data, filters) => {
  const filteredByEndLocation =  data.filter((renting) => renting.location_end_name.toLowerCase().includes(filters.endLocation.toLowerCase()));
    const filterByDay = filteredByEndLocation.filter((renting)=> renting.renting_date.toLowerCase().includes(filters.finishRent.toLowerCase()));
      return filterByDay;
}

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
    const [rentingsFilter, setRentingsFilter] = useState({
      endLocation: "", 
      finishRent: "",
    });
    const [update, setUpdate] = useState(false);
    const [filteredRentings, setFilteredRentings] = useState([]);
    const [filteredDay, setFilteredDay] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);

    const url = `/rentings`;

    useEffect(() => {
      setFilteredRentings(applyFilters(rentings, rentingsFilter));
    }, [rentingsFilter])

    useEffect(()=>{
      dynamicGetFetch(url) 
      .then((data) => {
        data = data.filter(
          item => item.finished_date !== null
      );
        setRentings(data);
        setFilteredRentings(applyFilters(data, rentingsFilter));
      })
    }, [update]);

   const sortedRentings = rentings.sort(
     (a,b)=>{
       return new Date(b.renting_date) - new Date(a.renting_date);}
   )

   const search = searchVal => {
    setRentingsFilter((prev) => {
      return {
        ...prev,
        endLocation: searchVal}
    })
  };
    const searchDay = searchVal => {
      setRentingsFilter((prev)=> {
        return { ...prev, 
          finishRent:searchVal
        }
      })

    }

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
                      <FilterRentings 
                        search={search}
                        setIsFiltered={setIsFiltered}/>
                      <FilterByDate searchDay={searchDay}/>
                  </div>
                  <CurrentRentings/>
                    <div className="table">
                      <h3>All Rentings</h3>
                      <RentingTable
                        filteredRentings={filteredRentings} 
                        sortedRentings={sortedRentings}
                        isFiltered={isFiltered}/> 
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
