import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VolunteerPanel from '../VolunteerPanel';



const formReducer = (state, event) => {
  if (event.reset) {
    return {
      filename: '',
      gender: '',
      name: '',
      lastname: '',
      passport: '',
      address: '',
      dateofbirth: '',
      email: '',
      phonenumber: '',
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
    const data = { formData };

    fetch("http://localhost:3000/bikes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
          <Link to={'/residents'}>
            <p> 	&#60; ALL RENTERS</p>
          </Link>
        </div>


        <div className="newrenter-form-wrapper">

          <p><b>ADD NEW RENTER</b></p>

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

            <div className="wrap-names-renter">

              <div className="margin-form-name">
                <Form.Control name="name" autocomplete="off" onChange={handleChange} value={formData.name || ''} placeholder="Name" />
              </div>

              <div className="margin-form-name">
                <Form.Control name="lastname" autocomplete="off" onChange={handleChange} value={formData.lastname || ''} placeholder="Last Name" />
              </div>

            </div>

            <div className="margin-form">
              <Form.Control name="passport" autocomplete="off" onChange={handleChange} value={formData.passport || ''} placeholder="Passport" />
            </div>

            <div className="margin-form">
              <Form.Control name="address" autocomplete="off" onChange={handleChange} value={formData.address || ''} placeholder="Address" />
            </div>

            <div className="margin-form condition">
              <p>GENDER</p>
              <Form.Control as="select" className="select" name="gender" onChange={handleChange} value={formData.gender || ''}>

                <option value="" disabled selected hidden>Choose...</option>

                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>

              </Form.Control>
            </div>

            <div className="margin-form condition">
              <p>DATE OF BIRTH</p>
              <Form.Control type="date" name="dateofbirth" autocomplete="off" onChange={handleChange} value={formData.dateofbirth || ''} placeholder="Date of Birth" />
            </div>

            <div className="margin-form">
              <Form.Control type="email" name="email" autocomplete="off" onChange={handleChange} value={formData.email || ''} placeholder="Email" />
            </div>

            <div className="margin-form">
              <Form.Control type="tel" name="phonenumber" autocomplete="off" onChange={handleChange} value={formData.phonenumber || ''} placeholder="Phone Number" />
            </div>

            <div className="margin-form-button">
              <Button className="submit-button" type="submit" disabled={submitting}>Register</Button>
            </div>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default CreateNewRenter