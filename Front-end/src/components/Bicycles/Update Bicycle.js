import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VolunteerPanel from '../VolunteerPanel';

const bikeFormReducer = (state, event) => {
  if (event.type === 'fetch') {
    return event.bike;
  }
  console.log(state, event);
  return {
    ...state,
    [event.name]: event.value,
  }
}
function UpdateBicycle(props) {
  console.log(props.match.params.id);
  
  const [submitting, setSubmitting] = useState(false);
  const [station, setStation] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [photoThumbnail, setPhotoThumbnail] = useState("Photo")
  
  useEffect(() => {
    fetch("http://localhost:3000/station")
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        setStation(data);
      })
  }, []);
  
  const [bike, setBike] = useReducer(bikeFormReducer, {
  });
  
  useEffect(() => {
    fetch("http://localhost:3000/bikes")
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        console.log(data)
        const bike = data.find(x => x.id == props.match.params.id)
        setBike({
          type: 'fetch',
          bike: bike,
        })
      })
    
      console.log(bike);
    }, [setBike, props.match.params.id]);
  const handleSubmit = event => {
    
    event.preventDefault();
    setSubmitting(true);
    fetch(`http://localhost:3000/bikes/${bike.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bike),
    })
    //FETCH TO UPLOAD THE BICYCLE PHOTO
    /*fetch(
      'https://localhost:...',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });*/
    
      setTimeout(() => {
      alert("Bicycle Updated!");
      setSubmitting(false);
    }, 500);
  }
  
  const handleChange = event => {
    setBike({
      name: event.target.name,
      value: event.target.value,
    });
  }
  
  const changeHandler = event => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    setPhotoThumbnail(<img className="photo-btn" src={URL.createObjectURL(event.target.files[0])} />);
    console.log(selectedFile);
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
            <p>&#60; ALL BICYCLES</p>
          </Link>
        </div>
        <div className="form-wrapper">
          <p><b>UPDATE BICYCLE</b></p>
          <Form onSubmit={handleSubmit} className="form-align" >
            <div className="margin-form">
              <button
                type="button"
                onClick={imageUpload}
                className="photo-btn"
                disabled={submitting}
              >{photoThumbnail}</button>
              <Form.File
                id="bikephoto"
                name="bike_photo"
                onChange={changeHandler}
                value={bike.bike_photo || ''}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                disabled={submitting}/>
            </div>
            <div className="margin-form">
              <Form.Control
                name="model_name"
                autocomplete="off"
                onChange={handleChange}
                value={bike.model_name}
                disabled={submitting}
                required/>
            </div>
            <div className="margin-form">
              <Form.Control
                as="select"
                name="station"
                onChange={handleChange}
                value={bike.station}
                disabled={submitting}
                required>
                {<option value="" disabled selected hidden>{bike.station}</option>}
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
                value={bike.conditions}
                disabled={submitting}
                required/>
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
export default UpdateBicycle;