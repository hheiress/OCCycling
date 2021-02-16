import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VolunteerPanel from '../VolunteerPanel';




const formReducer = (state, event) => {
  if (event.reset) {
    return {
      filename: '',
      station: '',
      model_name: '',
      conditions: '',
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
  const date = Date()

  const handleSubmit = event => {

    
    

    fetch("http://localhost:3000/bikes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
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

          <Form className="form-align" onSubmit={handleSubmit}>

              <div className="margin-form">
                <button type="button" onClick={imageUpload} className="photo-btn">Photo</button>
                <Form.File
                  id="bicyclephoto"
                  name="filename"
                  onChange={handleChange}
                  value={formData.filename || ''}
                  ref={hiddenFileInput}
                  style={{ display: 'none' }}

                />
              </div>
              <div className="margin-form">

                <Form.Control type="text" name="model_name" autocomplete="off" onChange={handleChange} value={formData.model_name || ''} placeholder="Name" />
              </div>
              <div className="margin-form">
                <Form.Control as="select" name="station" onChange={handleChange} value={formData.station || ''}>

                  <option value="" disabled selected hidden>Station</option>
                  {station.map((item) => (
                    <option value={item.station_name}>{item.station_name}</option>
                  ))}

                </Form.Control>
              </div>
              <div className="margin-form condition">
                <p>CONDITION</p>

                <Form.Control as="textarea" rows={5} autocomplete="off" name="conditions" onChange={handleChange} value={formData.conditions || ''} />

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