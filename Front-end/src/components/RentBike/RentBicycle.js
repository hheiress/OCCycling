import React, { useState, useEffect, useReducer } from "react";
import './RentBike.css';
import Form from 'react-bootstrap/esm/Form';
import FilterRenters from "./FilterRenters"
import VolunteerPanel from '../VolunteerPanel';
import Footer from "../Footer";
import {toast} from "react-toastify/dist";
import dynamicGetFetch from "./../DymanicRequests/dynamicGetFetch";
import dynamicPostFetch from "./../DymanicRequests/dynamicPostFetch";

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
        station_id_start: '',
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
    
  const urlBikes = `/bikes`;
  const urlStation =`/station`
  //get bikes with the status null
  useEffect(() => {
    dynamicGetFetch(urlBikes)
    .then((data) => {
      ("Second render");
      setBikes(data);
    })
  }, []);

     //get station 
    useEffect(() => {
      dynamicGetFetch(urlStation)
      .then((data) => {
        ("First render for station");
        setStation(data);
      })
    }, []);

    const filteredBicycles = bikes.filter(
        item => item.status === null ||  item.status === "Available"
      );


    const handleSubmit = event => {
        const today =  new Date().toString().slice(4, 25);
        console.log(today)
       
         const object = { 
          "bike_id": dataForm.bike_id,
          "user_id": users.id,
          "last_name": users.id,
          "status": "In Rent" , 
          "renting_date": today,
          "station_id_start": dataForm.station_id_start,
          "starting_time": dataForm.starting_time + ":00:00",
          "conditions_id": dataForm.bike_id,
      }
      
      console.log(dataForm.bike_id);
      console.log(object);

      event.preventDefault();
      setSubmitting(true);
      // const urlRentings = `/rentings`;
      // dynamicPostFetch(urlRentings, object)
      fetch("http://localhost:3000/rentings", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object), 
      })
      .then(() => {
        const body = {
          "status": "Unavailable",
          "station_id": dataForm.station_id_start
        } 
        console.log(body);
        return fetch(`http://localhost:3000/bikes/update/${dataForm.bike_id}`, {
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
        toast.info("New Renting Added");
        setSubmitting(false);
        setDataForm({
          reset: true
        });
      }, 3000);
    }
    // (getStationId[0].id)
      const handleChange = event => {
          setDataForm({
            name: event.target.name,
            value: event.target.value,
            
          });
          console.log(event.target.value)
      };   
      useEffect(()=>{
        console.log(dataForm)
        console.log("Bike selected ", dataForm);
        const bikeObject = bikes.find(
          item => item.id == dataForm.bike_id
        );
        // const getStationId = bikes.find(
        //   item => item.station_id = dataForm.station_id_start
        // );
       const getStationId = station.find((item)=>{
         if(item?.id === bikeObject?.station_id){
          console.log(item.id)
           dataForm.station_id_start = item.id
           return item.id;
         }
        })
        console.log(dataForm.bike_id)
        console.log(dataForm.station_id_start)
        console.log(getStationId)
      }, [dataForm])
      console.log(dataForm)
     
    const [activeRow, setActiveRow] = useState("");

    function handleRowClick (event) {
      console.log(event)
        const dataRow = {
          id: event.target.dataset.title
        };
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
                        <FilterRenters 
                        handleRowClick={handleRowClick}
                        activeRow={activeRow}
                        setUser={setUser} />
                    </div>
                    <div>
                        <h4 className="bicycle-rent mt-3">Choose Bicycle</h4>
                        <Form.Control 
                        as="select" 
                        name="bike_id" 
                        onChange={handleChange}
                        value={dataForm.bike_id}
                        required >
                            <option> Choose </option>
                            {filteredBicycles.map((item, index) => (
                                <option key={index} value={item.id}>{item.bike_number} - {item.brand_name} {item.model_name}</option>))}
                         </Form.Control>

                         <h4 className="addtime-header mt-3">Set Time</h4>
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