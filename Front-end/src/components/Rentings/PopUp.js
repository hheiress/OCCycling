import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';

const PopUp = (props) => {
  const [station, setStation] = useState({stations: null, selectedStation_Id: null})

  useEffect(() => {
    fetch("http://localhost:3000/station")
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        setStation({...station, stations: data});
      })
  }, [])



  const handleClick = () => {
      props.toggle();
  };

  const handleChange = (e) => {
    console.log(e.target.value)
    console.log(props.id)
      fetch(`http://localhost:3000/bikes/update/${props.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({station_id: e.target.value, status: 'Available'}),
        })
        .then(res => res.json())
        .then(data => console.log(data))
  }


  return (
    <>
      <div >
        <div >
        {station.stations && <Form.Control as="select" name="station_id" onChange={handleChange}  required>
            <option value=""  selected >Station</option>
                {station.stations?.map((item) => (
                <option key={item.id} value={item.id}>{item.station_name}</option>
                ))}
        </Form.Control>}   
        </div>
      </div>
    </>
  ); 
}
export default PopUp;