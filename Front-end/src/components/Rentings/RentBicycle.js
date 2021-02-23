import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FilterRenters from "./FilterRenters"
import VolunteerPanel from '../VolunteerPanel';
import AddTime from "./AddTime";

const rentingForm = (state, event) => {
    if (event.reset) {
      return {
        model_name: '',
        name: '',
        last_name: '',
        status: '',
        renting_date: '',
        station_name: '',
        starting_time: '',
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
      
    const handleSubmit = event => {
        const today =  new Date().toString().slice(4, 25);

        // const conditions = dataForm.filter(
        //     item=>{
        //         if(dataForm.model_name === item.model_name){
        //         return item.condition;
        //     }
        //})

        const object = { 
         "model_name": dataForm.model_name,
         "name": dataForm.dataRow.name,
         "last_name":dataForm.dataRow.last_name,
         "status": 'Unavailable',
         "renting_date": today, 
         "station_name": dataForm.station_name,
         "starting_time": dataForm.starting_time,
         "conditions": dataForm.condition
        }
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
          name: event.target.dataset.title,
          last_name: event.target.headers
        };
        alert("User Selected")
        console.log(dataRow);
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
                                <option key={index} value={item.value} >{item.model_name} </option>))}
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
                        <AddTime  value={dataForm}/>
                    </div>
                    <button className="mt-5 btn btn-primary w-100" type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}
//}
export default RentBicycle;