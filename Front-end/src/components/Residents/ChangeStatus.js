import react, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ChangeStatus = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const [changedStatus, setChangedStatus] = useState(null);

    useEffect(()=>{
        newMagic() 
    }, [changedStatus])

    function newMagic () {
        console.log(changedStatus);
        fetch(`http://localhost:3000/users/update/${props.user_id}`,{
          method: `PUT`,
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({status:changedStatus})
       })
       .then(res => res.json())
       .then(data => (data))
      
      }
    const handleSubmit=(event) => {
        // setChangedStatus("Active")
        const findStatus = elem =>{
            console.log("status: ", elem) 
               if(elem === 'Banned'){
                return elem = 'Active'}
               else {
                return elem = 'Banned'}
        }
        
        const userStatus = props.user_status;
    
        console.log(userStatus)
        const newStatus = findStatus(userStatus)
        console.log(newStatus)
        setChangedStatus(newStatus)
        event.preventDefault();
        setSubmitting(true);
        toast.info("User Active! Update the page")
    }

return (
    <div>
        <button onClick={handleSubmit} className="active-button">Change Status</button>
    </div>
    )
}

export default ChangeStatus;