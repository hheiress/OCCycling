import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/esm/Form';
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";

const FilterRentings = (props) => {
    const [station, setStation] = useState([]);

    const urlStation = `/station`;
    
    useEffect(() => {
        dynamicGetFetch(urlStation)
        .then((data) => {
          ("First render for station");
          setStation(data);
        })
    }, []);

   const [searchInput, setSearchInput] = useState("");
   const handleSearchInput = event => {
    setSearchInput(event.target.value);
  };
  useEffect(()=>{
  console.log("Form submitted ", searchInput);
    props.search(searchInput);
  }, [searchInput])
//   const handleSubmit = event => {
//     event.preventDefault();
//     ("handle submit", event)
//     props.search(searchInput);
// };
  // const search = searchVal => {
  //   console.info("Filtered!", searchVal);
  //   const filteredStation = station.filter(
  //      item => item.station_name === searchVal 
  //     );
  //     setStation(filteredStation);
  //   };
  
      return (
          <>
         <div>
                   <Form.Control 
                          className="renting-station-filter"
                          as="select"
                          name="station_name"
                          value={searchInput}
                          onChange={handleSearchInput}
                          required>
                            <option value=""> Choose station</option>
                            {station.map((item, index) => (
                                <option key={index} value={item.value}>{item.station_name}</option>))}
                    </Form.Control>
                   
         </div>
  </>)
  }
  export default FilterRentings;
  