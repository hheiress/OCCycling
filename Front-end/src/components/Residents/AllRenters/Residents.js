import React, { useState, useEffect } from "react";
import VolunteerPanel from '../../VolunteerPanel';
import { Link } from "react-router-dom";
import Search from "../../RentBike/Search";
import DeleteRenter from "../UpdateRenter/DeleteRenter";
import Footer from "../../Footer";
import ExportResidents from "./ExportResidents"
import ResidentsTable from "./ResidentsTable";
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";

const AllRenters = props => {
  const [renters, setRenters] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const url =`/users`;

  useEffect(() => {
    dynamicGetFetch(url)
      .then((data) => {
        console.log("First render");
        data = data.filter(
          item => item.status !== "Not active"
      );
      setRenters(data);
      })
  }, []);

  const search = searchVal => {
    console.info("TO DO!", searchVal);
    const filteredResidents = renters.filter(
      item => item.name.includes(searchVal) || item.last_name.includes(searchVal)
    );
    setFilteredUsers(filteredResidents);
  };

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
          <table className="table" >
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Passport</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Date of birthday</th>
                <th>Nationality</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Edit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                {console.log(renters)}
              {filteredUsers?.length > 0 ? filteredUsers.map((item, index) => (
                <ResidentsTable 
                   item={item}
                   index={index}
                />
                ))
              :
              renters.map((item, index) => (
                <ResidentsTable 
                  item={item}
                  index={index}
                />
              ))
              }
              </tbody>
            </table>
          </div> 
        </div>
      </div>
      <Footer />
    </>)
}
export default AllRenters;