import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const FilterRenters = props => {
    
    const [renters, setRenters] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(null);

      useEffect(()=>{
        fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((data) => {
          ("First renter");
          data = data.filter(
            item => item.status !== "Banned"
        );
          setRenters(data);
        })
      }, []);
  
      const search = searchVal => {
        console.info("Filtered!", searchVal);
        const filteredResidents = renters.filter(
          item => item.name === searchVal || item.last_name === searchVal
        );
        setFilteredUsers(filteredResidents);
      };

      const handleSubmit = event => {
        event.preventDefault();
        props.handleRowClick();
      };
      const [selectStatus, setSelectStatus] = useState(null);
      const highlightRow = () => {
        if (selectStatus === "") {
          console.log("Highlight row");
          setSelectStatus("table-row");
        } else {
          console.log("Remove highlight");
          setSelectStatus("");
        }
      };
      return (
          <>
              <div className="search-box">
                      <Search search={search} />
                      <div className="table scrollingTable">
                          <table className="table user-renting">
                              <thead>
                                  <tr >
                                      <th>User ID</th>
                                      <th>First name</th>
                                      <th>Last name</th>
                                      <th>Date of birthday</th>
                                      <th>Phone number</th>
                                    </tr>
                                </thead>
                              <tbody>
                                  {filteredUsers?.length > 0 ? filteredUsers.map((item, index) => (
                                      <tr className={selectStatus} onClick={props.handleRowClick} key={index} >
                                      <td data-title={item.id} >{item.id}</td>
                                      <td data-title={item.id} >{item.name}</td>
                                      <td data-title={item.id} >{item.last_name}</td>
                                      <td data-title={item.id} >{item.date_birth.slice(0,10)}</td>
                                      <td data-title={item.id}>{item.phone_number}</td>
                                    </tr>
                                  ))
                                  :
                                  renters.map((item, index) => (
                                    <tr className={selectStatus} onClick={props.handleRowClick} key={index} >
                                    <td data-title={item.id} >{item.id}</td>
                                    <td data-title={item.id} >{item.name}</td>
                                    <td data-title={item.id} >{item.last_name}</td>
                                    <td data-title={item.id} >{item.date_birth.slice(0,10)}</td>
                                    <td data-title={item.id}>{item.phone_number}</td>
                                    </tr>
                                  ))  
                                } 
            </tbody>
          </table>

        </div>
    </div>
  </>)
  }
  export default FilterRenters;
  