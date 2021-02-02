import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../Residents/Search";

const FilterRenters = props => {
    const [renters, setRenters] = useState([]);
      useEffect(()=>{
        fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((data) => {
          console.log("First render");
          setRenters(data);
        })
      }, []);
  
      const search = searchVal => {
        console.info("TO DO!", searchVal);
        const filteredResidents = renters.filter(
          item => item.name === searchVal || item.last_name === searchVal
        );
        setRenters(filteredResidents);
      };
    
      return (
          <>
              <div className="search-box">
                      <Search search={search} />
                      <div className="table">
                          <table className="table">
                              <thead>
                                  <tr>
                                      <th>First name</th>
                                      <th>Last name</th>
                                      <th>Date of birthday</th>
                                      <th>Phone number</th>
                                      </tr>
                                  </thead>
                              <tbody>
                                  {console.log(renters)}
                                  {renters.map((item, index) => (
                                      <tr key={index}>
                                      <td>{item.name}</td>
                                      <td>{item.last_name}</td>
                                      <td>{item.date_birth}</td>
                                      <td>{item.phone_number}</td>
                                    </tr>
                                  ))} 
            </tbody>
          </table>
        </div>
    </div>
  </>)
  }
  export default FilterRenters;
  