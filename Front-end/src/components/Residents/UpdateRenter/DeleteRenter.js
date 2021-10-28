import React from "react";

function DeleteRenter(props) {

    const handleChange = event => {
        event.preventDefault();
        console.log(props.params);

        setTimeout(() => {
            if (window.confirm(`Do you want to delete user ${props.name}?`)) {

                fetch(`http://localhost:3000/users/delete/${props.params}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({status:"Not active"})
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
            <button onClick={handleChange} className="delete-button">Delete Renter</button>
        </div>
    )
}


export default DeleteRenter;