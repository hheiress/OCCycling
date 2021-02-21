import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VolunteerPanel from '../VolunteerPanel';

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      user_photo: '',
      gender: '',
      name: '',
      last_name: '',
      passport: '',
      address: '',
      date_birth: '',
      nationality: '',
      email: '',
      phone_number: '',
      status: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function CreateNewRenter() {
  const [dataForm, setDataForm] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [photoThumbnail, setPhotoThumbnail] = useState ("Photo")

  const handleSubmit = event => {

    const object = {
      "name": dataForm.name,
      "last_name": dataForm.last_name,
      "passport": dataForm.passport,
      "address": dataForm.address,
      "gender": dataForm.gender,
      "date_birth": dataForm.date_birth,
      "nationality": dataForm.nationality,
      "email": dataForm.email,
      "phone_number": dataForm.phone_number,
      "status": "Active"
    }

    const formData = new FormData();
		formData.append('File', selectedFile);

    if (dataForm.phone_number > 2147483647) {
      alert("***Phone Number must have 9 digits***");
      event.preventDefault();

    } else {

      event.preventDefault();

      setSubmitting(true);

      fetch("http://localhost:3000/users", {
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

       //FETCH TO UPLOAD THE USER PHOTO 
    
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
        alert("New User Added");
        setSubmitting(false);
        setDataForm({
          reset: true
        });

      }, 3000);
    }
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
          <Link to={'/residents'}>
            <p>&#60; ALL RENTERS</p>
          </Link>
        </div>


        <div className="newrenter-form-wrapper">

          <p><b>ADD NEW RENTER</b></p>

          <Form className="form-align" onSubmit={handleSubmit}>

            <div className="margin-form">

              <button
                type="button"
                onClick={imageUpload}
                className="photo-btn">{photoThumbnail}</button>

              <Form.File
                id="userphoto"
                name="user_photo"
                onChange={changeHandler}
                value={dataForm.user_photo || ''}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
              />
            </div>

            <div className="wrap-names-renter">

              <div className="margin-form-name">
                <Form.Control
                  name="name"
                  autocomplete="off"
                  onChange={handleChange}
                  value={dataForm.name || ''}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="margin-form-name">
                <Form.Control
                  name="last_name"
                  autocomplete="off"
                  onChange={handleChange}
                  value={dataForm.last_name || ''}
                  placeholder="Last Name"
                  required
                />
              </div>

            </div>

            <div className="margin-form">
              <Form.Control
                name="passport"
                autocomplete="off"
                onChange={handleChange}
                value={dataForm.passport || ''}
                placeholder="Passport"
                required
              />
            </div>

            <div className="margin-form">
              <Form.Control
                name="address"
                autocomplete="off"
                onChange={handleChange}
                value={dataForm.address || ''}
                placeholder="Address"
                required
              />
            </div>

            <div className="margin-form condition">
              <p>GENDER</p>
              <Form.Control
                as="select"
                className="select"
                name="gender"
                onChange={handleChange}
                value={dataForm.gender || ''}
                required >

                <option value="" disabled selected hidden>Choose...</option>

                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>

              </Form.Control>
            </div>

            <div className="margin-form condition">
              <p>DATE OF BIRTH</p>
              <Form.Control
                type="date"
                name="date_birth"
                autocomplete="off"
                onChange={handleChange}
                value={dataForm.date_birth || ''}
                placeholder="Date of Birth"
                required
              />
            </div>

            <div className="margin-form condition">
              <Form.Control
                name="nationality"
                autocomplete="off"
                onChange={handleChange}
                value={dataForm.nationality || ''}
                placeholder="Nationality"
                required />
            </div>

            <div className="margin-form">
              <Form.Control
                type="email"
                name="email"
                autocomplete="off"
                onChange={handleChange}
                value={dataForm.email || ''}
                placeholder="Email"
                required />
            </div>

            <div className="margin-form">
              <Form.Control className="number"
                type="number"
                name="phone_number"

                onChange={handleChange}
                value={dataForm.phone_number || ''}
                placeholder="Phone Number"
                required />
            </div>

            <div className="margin-form-button">
              <Button className="submit-button" type="submit">Register</Button>
            </div>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default CreateNewRenter