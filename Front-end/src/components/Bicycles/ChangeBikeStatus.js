import react, { useState, useEffect } from "react";

const ChangeBikeStatus = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const [changedStatus, setChangedStatus] = useState(null);

    useEffect(()=>{
        newMagic() 
    }, [changedStatus])

    function newMagic () {
        console.log(changedStatus);
        fetch(`http://localhost:3000/bikes/update/status/${props.bike_id}`,{
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
        const findStatus = elem =>{
            console.log("status: ", elem) 
               if(elem === 'Unavailable'){
                return elem = 'Available'}
               else {
                return elem = 'Unavailable'}
        }
        
        const bikeStatus = props.bike_status;
    
        console.log(bikeStatus)
        const newStatus = findStatus(bikeStatus)
        console.log(newStatus)
        setChangedStatus(newStatus)
        event.preventDefault();
        setSubmitting(true);
        alert("Bike status updated! Update the page")
    }

return (
    <div>
        <button onClick={handleSubmit} className="active-button">Change Status</button>
    </div>
    )
}

export default ChangeBikeStatus;