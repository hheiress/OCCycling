import React from "react";

function DeleteBike(props) {

    const handleChange = event => {
        event.preventDefault();
        console.log(props.params);

        fetch(`http://localhost:3000/bikes/${props.params}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            
          })
          window.location.reload();
    }

    return (

        <div>
            <button onClick={handleChange} className="delete-button">Delete</button>
        </div>
    )
}


export default DeleteBike;