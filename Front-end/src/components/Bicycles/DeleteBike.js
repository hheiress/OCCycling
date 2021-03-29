import React from "react";

function DeleteBike(props) {

    const handleChange = event => {
        event.preventDefault();
        console.log(props.params);

        setTimeout(() => {
            if (window.confirm(`Do you want to deleted ${props.name}?`)) {

                fetch(`http://localhost:3000/bikes/${props.params}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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