import react, { useState,useEffect } from "react";
import {toast} from "react-toastify";

const BannUser = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit=event =>{
        event.preventDefault();
        setSubmitting(true);

        fetch(`http://localhost:3000/users/update/${props.user_id}`,{
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({status: 'Banned'})
         })
         .then(res => res.json())
         .then(data => (data))
         toast.dark("User Banned! Update the page")
    };

return (
    <div>
        <button onClick={handleSubmit} className="bann-button" >Bann User</button>
    </div>
    )
}

export default BannUser;