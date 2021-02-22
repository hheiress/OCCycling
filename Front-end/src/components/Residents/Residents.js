import React, { useState, useEffect } from "react";
import VolunteerPanel from '../VolunteerPanel';
import { Link } from "react-router-dom";
import Search from "./Search";

const AllRenters = props => {
  const [renters, setRenters] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/users")
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
      <VolunteerPanel />
      <div className="wrapper">
        <div className="residents-wrapper">
          <h2 className="text-center">Residents</h2>
          <Link to={'/createnewrenter'}>
            <button className="mt-5 btn btn-primary w-100" type="submit">Create New Renter</button>
          </Link>
          <Search search={search} />
          <div className="table">
            <table className="table">
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
                </tr>
              </thead>
              <tbody>
                {console.log(renters)}
                {renters.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.passport}</td>
                    <td>{item.address}</td>
                    <td>{item.gender}</td>
                    <td>{item.date_birth}</td>
                    <td>{item.nationality}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                    <td>
                      <button>Delete</button>
                      <Link to={'/updaterenter/' + item.id}>
                        <button>Update</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>



        </div>
      </div>
    </>)
}
export default AllRenters;
