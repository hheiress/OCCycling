import react, { useState,useEffect } from "react";

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
         .then(data => console.log(data))
    };

return (
    <div>
        <button onClick={handleSubmit} className="bann-button" >Bann User</button>
    </div>
    )
}

export default BannUser;