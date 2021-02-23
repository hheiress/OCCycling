import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../Residents/Search";

const FilterRenters = props => {
    
    const [renters, setRenters] = useState([]);
      useEffect(()=>{
        fetch("http://localhost:3001/users")
        .then((res) => res.json())
        .then((data) => {
          console.log("First render");
          setRenters(data);
        })
      }, []);
  
      const search = searchVal => {
        console.info("Filtered!", searchVal);
        const filteredResidents = renters.filter(
          item => item.name === searchVal || item.last_name === searchVal
        );
        setRenters(filteredResidents);
      };

      const handleSubmit = event => {
        event.preventDefault();
        props.handleRowClick();
      };
      return (
          <>
              <div className="search-box">
                      <Search search={search} />
                      <div className="table">
                          <table className="table user-renting">
                              <thead>
                                  <tr>
                                      <th>User ID</th>
                                      <th>First name</th>
                                      <th>Last name</th>
                                      <th>Date of birthday</th>
                                      <th>Phone number</th>
                                    </tr>
                                </thead>
                              <tbody>
                                  {renters.map((item, index) => (
                                      <tr onClick={props.handleRowClick} key={index} >
                                      <td data-title={item.id} >{item.id}</td>
                                      <td data-title={item.id} >{item.name}</td>
                                      <td data-title={item.id} >{item.last_name}</td>
                                      <td data-title={item.id} >{item.date_birth}</td>
                                      <td data-title={item.id}>{item.phone_number}</td>
                                    </tr>
                                  ))} 
            </tbody>
          </table>

        </div>
    </div>
  </>)
  }
  export default FilterRenters;
  