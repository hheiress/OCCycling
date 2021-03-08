import React from "react";

function DeleteRenter(props) {

    const handleChange = event => {
        event.preventDefault();
        console.log(props.params);

        setTimeout(() => {
            if (window.confirm(`Do you want to delete user ${props.name}?`)) {

                fetch(`http://localhost:3000/users/${props.params}`, {
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


export default DeleteRenter;