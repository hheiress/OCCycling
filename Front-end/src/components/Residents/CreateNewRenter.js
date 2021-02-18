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
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {

    const object = {
      "name": formData.name,
      "last_name": formData.last_name,
      "passport": formData.passport,
      "address": formData.address,
      "gender": formData.gender,
      "date_birth": formData.date_birth,
      "nationality": formData.nationality,
      "email": formData.email,
      "phone_number": formData.phone_number,
      "status": "Active"
    }

    if (formData.phone_number > 2147483647) {
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

      setTimeout(() => {
        alert("New User Added");
        setSubmitting(false);
        setFormData({
          reset: true
        });

      }, 3000);
    }
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
                className="photo-btn">Photo</button>

              <Form.File
                id="userphoto"
                name="user_photo"
                onChange={handleChange}
                value={formData.user_photo || ''}
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
                  value={formData.name || ''}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="margin-form-name">
                <Form.Control
                  name="last_name"
                  autocomplete="off"
                  onChange={handleChange}
                  value={formData.last_name || ''}
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
                value={formData.passport || ''}
                placeholder="Passport"
                required
              />
            </div>

            <div className="margin-form">
              <Form.Control
                name="address"
                autocomplete="off"
                onChange={handleChange}
                value={formData.address || ''}
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
                value={formData.gender || ''}
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
                value={formData.date_birth || ''}
                placeholder="Date of Birth"
                required
              />
            </div>

            <div className="margin-form condition">
              <Form.Control
                name="nationality"
                autocomplete="off"
                onChange={handleChange}
                value={formData.nationality || ''}
                placeholder="Nationality"
                required />
            </div>

            <div className="margin-form">
              <Form.Control
                type="email"
                name="email"
                autocomplete="off"
                onChange={handleChange}
                value={formData.email || ''}
                placeholder="Email"
                required />
            </div>

            <div className="margin-form">
              <Form.Control className="number"
                type="number"
                name="phone_number"

                onChange={handleChange}
                value={formData.phone_number || ''}
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