import React, { useState, useEffect } from "react";
import VolunteerPanel from '../../VolunteerPanel';
import { Link } from "react-router-dom";
import Search from "../../RentBike/Search";
import DeleteRenter from "../UpdateRenter/DeleteRenter";
import Footer from "../../Footer";
import ExportResidents from "./ExportResidents"
import ResidentsTable from "./ResidentsTable";
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";

const applyFilters = (data, filters) =>{
  console.log(data)
  const filtersByName = data.filter((user)=> user.name.includes(filters.userName) || user.last_name.includes(filters.userName));
      return filtersByName ;
}

const AllRenters = props => {
  const [renters, setRenters] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userFilters, setUserFilters] = useState({
    userName:"",
  });


  const url =`/users`;

useEffect(()=>{
    setFilteredUsers(applyFilters(renters, userFilters))
},[userFilters]);

  useEffect(() => {
    dynamicGetFetch(url)
      .then((data) => {
        console.log("First render");
        data = data.filter(
          item => item.status !== "Not active"
      );
      setRenters(data);
      setFilteredUsers(applyFilters(data, userFilters));
      })
  }, []);

  const search = searchVal => {
    setUserFilters((prev)=>{
      console.log(searchVal);
      return {...prev,
      userName:searchVal}
    })
  };
console.log(filteredUsers)
  return (
    <>
      <VolunteerPanel />
      <div className="wrapper">
        <div className="residents-wrapper">
        <div className="headerExport">
            <h2 className="text-center">Residents</h2>
            <ExportResidents/>   
        </div>
         <Link to={'/createnewrenter'}>
            <button className="mt-5 btn btn-primary create-resident-btn" type="submit">Create New Renter</button>
        </Link>
        <Search search={search} />
          <div className="table">
            <ResidentsTable 
              filteredUsers={filteredUsers}
          />
          </div> 
        </div>
      </div>
      <Footer />
    </>)
}
export default AllRenters;
