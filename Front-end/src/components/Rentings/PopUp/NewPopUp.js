import React, {useState, useEffect, useReducer} from 'react';
import Form from 'react-bootstrap/esm/Form';
import {toast} from "react-toastify/dist";
import UpdatePopUpBtn from "./UpdatePopUpBtn";


const rentingForm = (state, event) => {
    if (event.reset) {
      return {station_id_end: ''};
    }
    console.log(state, event);
    return {
      ...state,
      [event.name]: event.value,
    }
  }

const NewPopUp = (props) => {
    const [station, setStation] = useState({stations: null, selectedStation_Id: null})
    const [update, setUpdate] = useState(false);
    
    const [bikes, setBikes] = useState([]);
    const [selectBike, setSelectBike] = useState(null);
    const [dataForm, setDataForm] = useReducer(rentingForm, {});

    useEffect(() => {
      fetch("http://localhost:3000/station")
        .then((res) => res.json())
        .then((data) => {
          ("First render");
          setStation({...station, stations: data});
        })
    }, [])
  
    const handleChange = (e) => {
      e.preventDefault();
      // const formData = new FormData();
      // formData.append("status", "Available")
      // formData.append("station_id", e.target.value)
      // console.log(formData.get("station_id"))
      // console.log(formData.get("status"))
      fetch(`http://localhost:3000/bikes/update/${props.details.bike_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: 'Available',
              station_id: e.target.value 
            }),
          })
          .then(res => res.json())
          .then(data => (data))
          toast.info("Station Updated!")
        setDataForm({
            name: e.target.name,
            value: e.target.value,
                
        });
        console.log(e.target.value)
    }
  
    const handleSubmit = event => {
        event.preventDefault(); 
        let stoppedDate=new Date().toString().slice(4, 25);
        console.log(dataForm.station_id)
        const object = { 
            "status": 'Rent finished',
            "finished_date": stoppedDate,
            "station_id_end": dataForm.station_id
        }
        console.log(object);
        
        setTimeout(() => {
            if (window.confirm(`Do you want to cancel the renting by ${props.details.name} ${props.details.last_name} ?`)) {
              fetch(`http://localhost:3000/rentings/update/${props.details.id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                      },
                  body: JSON.stringify(object),
                  }).then(()=> props.setUpdate(true))
            };
            toast.info("Renting Updated!");
            props.setUpdate(false)
            setSelectBike(bikes.filter(
                item => item.model_name === props.model_name
            ))
  
            props.handleClose();
            },
             500
          );
        }
       
    return (
      <>
        <div className="modal display-block">
          <div className="modal-main">
            <h2>Select the station to receive the bike</h2>
            {station.stations && <Form className="popup-station" as="select" name="station_id" onChange={handleChange}  required>
              <option value={dataForm.station_id} selected>Station</option>
                  {station.stations?.map((item) => (
                  <option key={item.id} value={item.id}>{item.station_name}</option>
                  ))}
            </Form>}  
            <button onClick={props.handleClose}>Back</button>
            <button onClick={handleSubmit}>Cancel Renting</button>
          </div>
        </div>
      </>
    ); 
  }
  export default NewPopUp;