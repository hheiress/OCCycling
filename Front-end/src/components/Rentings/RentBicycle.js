import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FilterRenters from "./FilterRenters"
import VolunteerPanel from '../VolunteerPanel';
import AddTime from "./AddTime";

const options = [
    {
      label: "1 hour",
      value: "1",
    },
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
        condition_id: ''
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

     //get station 
    useEffect(() => {
        fetch("http://localhost:3001/station")
          .then((res) => res.json())
          .then((data) => {
            console.log("First render for station");
            setStation(data);
          })
      }, []);

    //get bikes with the status null
    useEffect(() => {
        fetch("http://localhost:3001/bikes")
            .then((res) => res.json())
            .then((data) => {
                console.log("Second render");
                setBikes(data);
            })
    }, []);

    const filteredBicycles = bikes.filter(
        item => item.status === null
      );
    
    const getBikeId = filteredBicycles.filter(
        item => item.model_name === dataForm.model_name
    ) 
    
    const getStationId = station.filter(
        item => item.station_name === dataForm.station_name
    )
    const handleSubmit = event => {
        const today =  new Date().toString().slice(4, 25);
         const dataRow = {
            name: event.target.dataset.title,
            last_name: event.target.headers
          };
          
        const object = { 
            // "model_name": dataForm.model_name,
            "bike_id": getBikeId[0].id,
            "user_id": dataRow.id,
            "last_name":dataForm.last_name,
            "status": 'Unavailable',
            "renting_date": today, 
            // "station_name": dataForm.station_name,
            "station_id": getStationId[0].id,
            "starting_time": dataForm.starting_time ,
            "conditions": getBikeId[0].id
           }
        console.log(dataForm.model_name);
        console.log(object);

        event.preventDefault();
        setSubmitting(true);
        fetch("http://localhost:3001/rentings", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(object), 
        })
        .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })  
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
        //   last_name: event.target.headers
        };
        alert("User Selected")
        console.log(dataRow)
        // console.log(dataRow.name);
        // console.log(dataRow.last_name);
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
        </div>
    )
}
//}
export default RentBicycle;