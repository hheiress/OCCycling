import react, { useState, useEffect } from "react";
import { toast } from "react-toastify/dist";

const ChangeStatus = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const [changedStatus, setChangedStatus] = useState(null);
    const [currentBan, setCurrentBann]= useState("");

    useEffect(()=>{
        newMagic() 
    }, [changedStatus])

    useEffect(()=>{
        userCheck()
    },[currentBan])

    const today = new Date().toString().slice(4, 25);

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

    console.log("User id: ", props.user_id)

    function userCheck (){
        if(props.user_status==="Banned"){
        fetch(`http://localhost:3000/bann_history/${currentBan}`,{
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({finish_date:today})
         })
         .then(res => res.json())
         .then(data => (data));
         toast.success("User Active")
        } else if (props.user_status==="Active"){
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
         toast.dark("User Banned")
        }
    }

    const handleSubmit = (event) => { 
        fetch(`http://localhost:3000/bann_history/${props.user_id}`,{
            method: `GET`,
            headers: {
                'Content-Type': 'application/json',
            }
         })
         .then((res)=> res.json())
         .then(data => {
             console.log(data)
             setCurrentBann(data[0]?.id)
        })  
        
        const userStatus = props.user_status;
        const findStatus = elem =>{
            console.log("status: ", elem) 
               if(elem === 'Banned'){
                return elem = 'Active'}
               else {
                return elem = 'Banned'}
        }
        const newStatus = findStatus(userStatus)
        console.log(newStatus)
        setChangedStatus(newStatus)
        event.preventDefault();
        setSubmitting(true);
        console.log(userStatus)
    }

return (
    <div>
        <button onClick={handleSubmit} className="active-button">Change Status</button>
    </div>
    )
}

export default ChangeStatus;