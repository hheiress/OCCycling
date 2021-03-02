import React, { useEffect, useReducer, useState } from 'react'
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
function DeleteBicycle(props) {
  console.log(props.match.params.id);
  
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
  const handleDelete = event => {
    
    event.preventDefault();
    fetch(`http://localhost:3000/bikes/${bike.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bike),
    })
   
      setTimeout(() => {
      alert("Bicycle Updated!");
    }, 500);
  }
  

  
  return (
            <div className="margin-form-button">
              <Button onClick={handleDelete} className="submit-button">Delete</Button>
            </div>
  )
}
export default DeleteBicycle