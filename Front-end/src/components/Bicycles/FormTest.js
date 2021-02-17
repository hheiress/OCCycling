import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VolunteerPanel from '../VolunteerPanel';

function FormTest() {
    const object = { "model_name": "foi", "entry_date": "2000-01-01", "conditions": "foi"}

    const handleSubmit = async event => {
      event.preventDefault();
      await fetch("http://localhost:3000/bikes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
      })
    }
    
  
    return(
      <div className="wrapper">
        <h1>teste</h1>
        
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>Name</p>
              <input name="name" />
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

export default FormTest 