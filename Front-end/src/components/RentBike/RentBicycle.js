import React, { useState, useEffect, useReducer } from "react";
import Form from 'react-bootstrap/Form';
import FilterRenters from "./FilterRenters"
import VolunteerPanel from '../VolunteerPanel';
import Footer from "../Footer";

const options = [
    {
      label: "2 hours",
      value: "2",
    },
    {
      label: "3 hours",
      value: "3",
    },
    {
      label: "4 hours",
      value: "4",
    },
    {
      label: "5 hours",
      value: "5",
    }
  ];

const rentingForm = (state, event) => {
    if (event.reset) {
      return {
        bike_id: '',
        user_id: '',
        last_name: '',
        status: '',
        renting_date: '',
        station_id: '',
        starting_time: '',
        conditions_id: '',
      }
      
    }
    return {
      ...state,
      [event.name]: event.value
    }
  }

function RentBicycle() {
    const [dataForm, setDataForm] = useReducer(rentingForm, {});
    const [submitting, setSubmitting] = useState(false);
    const [bikes, setBikes] = useState([]);
    const [station, setStation] = useState([]);
    const [users, setUser] = useState([]);

     //get station 
    useEffect(() => {
        fetch("http://localhost:3000/station")
          .then((res) => res.json())
          .then((data) => {
            console.log("First render for station");
            setStation(data);
          })
      }, []);

    //get bikes with the status null
    useEffect(() => {
        fetch("http://localhost:3000/bikes")
            .then((res) => res.json())
            .then((data) => {
                console.log("Second render");
                setBikes(data);
            })
    }, []);

    const filteredBicycles = bikes.filter(
        item => item.status === null ||  item.status === "Available"
      );
    
    const getBikeId = filteredBicycles.filter(
        item => item.model_name === dataForm.model_name
    ) 
    
    const getStationId = station.filter(
        item => item.station_name === dataForm.station_name
    )
    const handleSubmit = event => {
        const today =  new Date().toString().slice(4, 25);
        console.log(today)
         const object = { 
          "bike_id": getBikeId[0].id,
          "user_id": users.id,
          "last_name": users.id,
          "status": "In Rent" , 
          "renting_date": today,
          "station_id": getStationId[0].id,
          "starting_time": dataForm.starting_time + ":00:00",
          "conditions_id": getBikeId[0].id,
      }
      console.log(dataForm.model_name);
      console.log(object.conditions_id);
      console.log(getBikeId[0].id);
      event.preventDefault();
      setSubmitting(true);
      fetch("http://localhost:3000/rentings", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object), 
      })
      .then(() => {
        const body = {
          "status": "Unavailable"
        } 
        return fetch(`http://localhost:3000/bikes/update/${getBikeId[0].id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
        
         body:JSON.stringify(body)
      })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      })  
      setTimeout(() => {
        alert("New Renting Added");
        setSubmitting(false);
        setDataForm({
          reset: true
        });
      }, 3000);
    }

     const handleChange = event => {
         setDataForm({
            name: event.target.name,
            value: event.target.value,
            });
           console.log(event.target.value)
          };   

                
    const handleRowClick = event => {
        const dataRow = {
          id: event.target.dataset.title
        };
        alert("User Selected")
        console.log(dataRow)
        setUser(dataRow)
      }
    
    return (
        <div>
            <VolunteerPanel />
            <div className="wrapper">
                <div className="residents-wrapper">
                    <h2 className="text-center">Rent a Bicycle</h2>
                    
                    <div className="search-fbox">
                        <FilterRenters handleRowClick={handleRowClick}/>
                    </div>
                    <div>
                        <h4 className="bicycle-rent mt-3">Choose Bicycle</h4>
                        <Form.Control 
                        as="select" 
                        name="model_name" 
                        onChange={handleChange}
                        value={dataForm.model_name}
                        required >
                            <option> Choose </option>
                            {filteredBicycles.map((item, index) => (
                                <option key={index} value={item.value}>{item.model_name} </option>))}
                         </Form.Control>
                         
                         <h4 className="bicycle-rent mt-3">Assign Station</h4>
                         <Form.Control 
                          as="select"
                          name="station_name"
                          onChange={handleChange}
                          value={dataForm.station_name}
                          required>
                            <option value=""> Choose </option>
                            {station.map((item, index) => (
                                <option key={index} value={item.value}>{item.station_name}</option>))}
                         </Form.Control>

                         <h4 className="addtime-header mt-3">Add Time</h4>
                         <Form.Control
                         as="select"
                         name="starting_time"
                         onChange={handleChange}
                         value={dataForm.starting_time}
                         required>
                             <option value="">-- Select --</option>
                             {options.map((option) => (
                             <option value={option.value}>{option.label}</option>
                        ))}
                        </Form.Control> 
                        {/* <AddTime 
                        name="starting_time" 
                        onChange={handleChange}
                        value={dataForm.starting_time}/> */}
                    </div>
                    <button className="mt-5 btn btn-primary w-100" type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
//}
export default RentBicycle;