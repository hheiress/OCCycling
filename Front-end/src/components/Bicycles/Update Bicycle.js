import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VolunteerPanel from '../VolunteerPanel';

const formReducer = (state, event) => {

  return {
    ...state,
    [event.name]: event.value
  }
}

function UpdateBicycle(props) {
  console.log(props.match.params.id);

  const [submitting, setSubmitting] = useState(false);
  const [station, setStation] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [photoThumbnail, setPhotoThumbnail] = useState("Photo")
  const [bike, setBike] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/station")
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        setStation(data);
      })
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/bikes")
      .then((res) => res.json())
      .then((data) => {
        console.log("First render");
        console.log(data)
        setBike(data.find(x => x.id == props.match.params.id));
      })
  }, []);

  const [dataForm, setDataForm] = useReducer(formReducer, {
  });

  const handleSubmit = event => {

    const object = {
      "model_name": dataForm.model_name,
      "entry_date": bike.entry_date,
      "conditions": dataForm.conditions,
      "station": dataForm.station,
    }

    const formData = new FormData();
    formData.append('File', selectedFile);

    event.preventDefault();
    setSubmitting(true);
    fetch("http://localhost:3001/bikes", {
      method: 'PUT',
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
    }, 3000);
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
            <p> 	&#60; ALL BICYCLES</p>
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
                value={dataForm.bike_photo || ''}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                disabled={submitting}

              />
            </div>
            <div className="margin-form">

              <Form.Control
                as="textarea"
                rows={1}
                name="model_name"
                autocomplete="off"
                onChange={handleChange}
                value={dataForm.model_name}
                defaultValue={bike.model_name}
                disabled={submitting}
                required

              />
            </div>
            <div className="margin-form">
              <Form.Control
                as="select"
                name="station"
                onChange={handleChange}
                value={dataForm.station}
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
                value={dataForm.conditions}
                defaultValue={bike.conditions}
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

export default UpdateBicycle