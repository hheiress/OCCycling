import React from "react";

function DeleteBike(props) {

    const handleChange = event => {
        event.preventDefault();
        console.log(props.params);

        setTimeout(() => {
            if (window.confirm(`Do you want to deleted ${props.name}?`)) {

                fetch(`http://localhost:3000/bikes/delete/${props.params}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({status:"Damaged and not in use"})
                })
                .then((response) => response.json())
                .then((result) => {
                console.log('Success:', result);
                })
                .catch((error) => {
                console.error('Error:', error);
                })
            };

        }, 300);

    }

    return (

        <div>
            <button onClick={handleChange} className="delete-button">Delete</button>
        </div>
    )
}


export default DeleteBike;