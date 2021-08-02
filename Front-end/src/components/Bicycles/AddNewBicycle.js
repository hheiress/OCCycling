import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VolunteerPanel from '../VolunteerPanel';
import { toast } from 'react-toastify';

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      bike_photo: null,
      station_id: null,
      model_name: '',
      brand_name: '',
      status: '',
      conditions: '',
      entry_date: null,
      bike_number: null
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function AddNewBicycle() {
  const [dataForm, setDataForm] = useReducer(formReducer, {
    
  });
  const [submitting, setSubmitting] = useState(false);
  const [station, setStation] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [photoThumbnail, setPhotoThumbnail] = useState ("Photo")

  useEffect(() => {
    fetch("http://localhost:3000/station")
      .then((res) => res.json())
      .then((data) => {
        ("First render");
        setStation(data);
      })
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const today = new Date().toISOString().slice(0, 10)

    const formData = new FormData();
    formData.append("user_photo", selectedFile);
    formData.append("model_name", dataForm.model_name)
    formData.append("brand_name", dataForm.brand_name)
    formData.append( "status", 'Available');
    formData.append( "entry_date", today);
    formData.append( "conditions", dataForm.conditions);
    formData.append( "station_id", dataForm.station_id);
    formData.append( "bike_number", dataForm.bike_number);

    setSubmitting(true);
    fetch("http://localhost:3000/bikes", {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      body: formData, 
    })

    .then((response) => response.json())
		.then((result) => {
				console.log('Success:', result);
		})
		.catch((error) => {
				console.error('Error:', error);
		})

    setTimeout(() => {
      toast.info("New Bicycle Added!");
      setSubmitting(false);
      setDataForm({
        reset: true
      });
  
    }, 500);
  }

  const handleChange = event => {
    setDataForm({
      name: event.target.name,
      value: event.target.value,
    });
   
  }

  const changeHandler = event => {
    setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);

    setPhotoThumbnail(<img className="photo-btn" src={URL.createObjectURL(event.target.files[0])}/>);

  }
  const hiddenFileInput = React.useRef(null);
  const imageUpload = event => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <VolunteerPanel />
      <div className="prelinks-wrapper">
          <Link to={'/bicycles'}>
            <p> 	&#60; ALL BICYCLES</p>
          </Link>
        </div>
      <div className="wrapper">
        <div className="form-wrapper">
          <p><b>ADD NEW BICYCLE</b></p>
          <Form onSubmit={handleSubmit} className="form-align" >
            <div className="margin-form">
              <button 
              type="button" 
              onClick={imageUpload} 
              className="photo-btn">{photoThumbnail}</button>
              
              <Form.File
                id="bikephoto"
                name="bike_photo"
                onChange={changeHandler}
                value={dataForm.bike_photo || ''}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
              />
            </div>
            <div className="margin-form">
              <Form.Control
                  type="number"
                  name="bike_number"
                  autocomplete="off"
                  onChange={handleChange}
                  value={dataForm.bike_number || null}
                  placeholder="Bike Number"
                  disabled={submitting}
                  required
              />
            </div>
            <div className="margin-form">
              <Form.Control 
              type="text" 
              name="model_name" 
              autocomplete="off" 
              onChange={handleChange} 
              value={dataForm.model_name || ''} 
              placeholder="Model"
              disabled={submitting}
              required  
              />
            </div>
            <div className="margin-form">
              <Form.Control
                  type="text"
                  name="brand_name"
                  autocomplete="off"
                  onChange={handleChange}
                  value={dataForm.brand_name || ''}
                  placeholder="Brand"
                  disabled={submitting}
                  required
              />
            </div>
            <div className="margin-form">
              <Form.Control as="select" name="station_id" onChange={handleChange} value={dataForm.station_id || ''} required>
                <option value="" disabled selected hidden>Station</option>
                {station.map((item) => (
                  <option value={item.id}>{item.station_name}</option>
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
              value={dataForm.conditions || ''}
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