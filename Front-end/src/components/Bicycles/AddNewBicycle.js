import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VolunteerPanel from '../VolunteerPanel';

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      bike_photo: '',
      station: '',
      model_name: '',
      conditions: '',
      entry_date: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function AddNewBicycle() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [station, setStation] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/station")
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        setStation(data);
      })
  }, []);

  const handleSubmit = event => {
    
    const today = new Date().toISOString().slice(0, 10)
    
    const object = { 
     "model_name": formData.model_name,
     "entry_date": today, 
     "conditions": formData.conditions 
    }
    
    event.preventDefault();
    setSubmitting(true);
    fetch("http://localhost:3000/bikes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
      
    })

    setTimeout(() => {
      alert("New Bicycle Added");
      setSubmitting(false);
      setFormData({
        reset: true
      });
      
    }, 3000);
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }
  const hiddenFileInput = React.useRef(null);
  const imageUpload = event => {
    hiddenFileInput.current.click();

  };
  return (

    <div>
      <VolunteerPanel />

      <div className="wrapper">
        <div className="return-form">
          <Link to={'/bicycles'}>
            <p> 	&#60; ALL BICYCLES</p>
          </Link>

        </div>

        <div className="form-wrapper">

          <p><b>ADD NEW BICYCLE</b></p>

          <Form onSubmit={handleSubmit} className="form-align" >

            <div className="margin-form">
              <button 
              type="button" 
              onClick={imageUpload} 
              className="photo-btn"
              disabled={submitting}
              >Photo</button>
              
              <Form.File
                id="bikephoto"
                name="bike_photo"
                onChange={handleChange}
                value={formData.bike_photo || ''}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                disabled={submitting}
                

              />
            </div>
            <div className="margin-form">

              <Form.Control 
              type="text" 
              name="model_name" 
              autocomplete="off" 
              onChange={handleChange} 
              value={formData.model_name || ''} 
              placeholder="Name"
              disabled={submitting}
              required  

              />
            </div>
            <div className="margin-form">
              <Form.Control as="select" name="station" onChange={handleChange} value={formData.station || ''} required>

                <option value="" disabled selected hidden>Station</option>
                {station.map((item) => (
                  <option value={item.station_name}>{item.station_name}</option>
                ))}

              </Form.Control>
            </div>
            <div className="margin-form condition">
              <p>CONDITION</p>

              <Form.Control 
              as="textarea" 
              rows={5} 
              autocomplete="off" 
              name="conditions" 
              onChange={handleChange} 
              value={formData.conditions || ''}
              disabled={submitting}
              required

              />

            </div>

            <div className="margin-form-button">
              <Button className="submit-button" type="submit" disabled={submitting}>Done</Button>
            </div>

          </Form>

        </div>
      </div>

    </div>
  )
}

export default AddNewBicycle