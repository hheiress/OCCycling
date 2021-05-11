import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';

const FilterBikes = (props) => {
    const [station, setStation] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/station")
          .then((res) => res.json())
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
//   const handleSubmit = event => {
//     event.preventDefault();
//     console.log("handle submit", event)
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
  