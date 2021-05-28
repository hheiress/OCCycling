import react, { useState, useEffect } from "react";

const ChangeStatus = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const [changedStatus, setChangedStatus] = useState(null);

    // const findStatus = (item) =>{
    //     if(props.user_status==="Banned"){
    //     return item.status=== 'Active'
    // }
    //     else {
    //      return item.status=== 'Banned'
    //     } 
    // }
// setChangedStatus(findStatus)
    const handleSubmit= event => {
     
        console.log(props.user_status)
        event.preventDefault();
        setSubmitting(true);
        fetch(`http://localhost:3000/users/update/${props.user_id}`,{
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({status:'Active'})
         })
         .then(res => res.json())
         .then(data => console.log(data))
         alert("User Active! Update the page")
    };

return (
    <div>
        <button onClick={handleSubmit} className="active-button">Change Status</button>
    </div>
    )
}

export default ChangeStatus;