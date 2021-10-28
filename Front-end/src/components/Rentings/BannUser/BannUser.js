import react, { useState,useEffect } from "react";
import {toast} from "react-toastify/dist";

const BannUser = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit=event =>{
        event.preventDefault();
        setSubmitting(true);
        const today = new Date().toString().slice(4, 25);
        console.log(today)
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

        fetch(`http://localhost:3000/bann_history`,{
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: props.user_id,
                start_date: today})
         })
         .then(res => res.json())
         .then(data => (data))
         toast.success("User history updated")
    };

return (
    <div>
        <button onClick={handleSubmit} className="bann-button" >Bann User</button>
    </div>
    )
}

export default BannUser;