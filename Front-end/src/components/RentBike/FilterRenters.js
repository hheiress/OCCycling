import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import NewTable from "./NewTable";
const moment = require('moment');

const FilterRenters = props => {
    const [activeRow, setActiveRow] = useState("");
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
          item => item.name.includes(searchVal) || item.last_name.includes(searchVal)
        );
        setFilteredUsers(filteredResidents);
      };

      const handleSubmit = event => {
        event.preventDefault();
        props.handleRowClick();
      };
      return (
          <>
              <div className="search-box">
                      <Search search={search} />
                      <div className="table scrollingTable">
                          <table className="table user-renting">
                              <thead>
                                  <tr>
                                      <th>User ID</th>
                                      <th>First name</th>
                                      <th>Last name</th>
                                      <th>Age</th>
                                      <th>Phone number</th>
                                    </tr>
                                </thead>
                              <tbody>
                                  {filteredUsers?.length > 0 ? filteredUsers.map((item, index) => (
                                      <NewTable 
                                      item={item}
                                      index={index}
                                      handleRowClick={props.handleRowClick}
                                      activeRow={props.activeRow}
                                      setUser={props.setUser}
                                      />
                                  ))
                                  :
                                  renters.map((item, index) => (
                                    <>
                                    <NewTable 
                                    item={item}
                                    index={index}
                                    handleRowClick={props.handleRowClick}
                                    activeRow={props.activeRow}
                                    setUser={props.setUser}
                                    />
                                    </>
                                  ))  
                                } 
            </tbody>
          </table>

        </div>
    </div>
  </>)
  }
  export default FilterRenters;
  