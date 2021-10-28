import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/esm/Form';
import dynamicGetFetch from "./../../../DymanicRequests/dynamicGetFetch";

const FilterBikes = (props) => {
    const [station, setStation] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const urlStation = `/station`;

    useEffect(() => {
        dynamicGetFetch(urlStation)
        .then((data) => {
          console.log("First render for station");
          setStation(data);
        })
    }, []);

   const handleSearchInput = event => {
    setSearchInput(event.target.value);
  };
  useEffect(()=>{
    console.log(searchInput)
    console.log("Form submitted ", searchInput);
    props.searchBike(searchInput);
    
  }, [searchInput])

      return (
          <>
         <div>
                   <Form.Control 
                          as="select"
                          name="station_name"
                          value={searchInput}
                          onChange={handleSearchInput}
                          required>
                            <option value=""> Station</option>
                            {station.map((item, index) => (
                                <option key={index} value={item.value}>{item.station_name}</option>))}
                    </Form.Control>
                   
         </div>
  </>)
  }
  export default FilterBikes;
  