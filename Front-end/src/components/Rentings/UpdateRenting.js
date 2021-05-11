import React, {useState, useEffect, useReducer} from 'react';

import PopUp from './PopUp'

const rentingFormReducer = (state, event) => {
  if (event.type === 'fetch') {
    return event.renting;
  }
  console.log(state, event);
  return {
    ...state,
    [event.name]: event.value,
  }
}

function UpdateRenting(props) {
  const [submitting, setSubmitting] = useState(false);
  const [renting, setRenting] = useReducer(rentingFormReducer, {});
  const [bikes, setBikes] = useState([]);
  const [selectBike, setSelectBike] = useState(null)
  const [station, setStation] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/rentings")
        .then((res) => res.json())
        .then((data) => {
            console.log("Renting render");
            console.log(data)
            const element = props.params;
            console.log(element)
            const renting = data.find(x => x.id == element);
            setRenting({ 
              type: 'fetch',
              renting: renting,
            })
        })
}, [setRenting, props.params ]);

useEffect(() => {
  fetch("http://localhost:3000/station")
    .then((res) => res.json())
    .then((data) => {
      console.log("First render for station");
      setStation(data);
    })
}, []);

useEffect(() => {
  fetch("http://localhost:3000/bikes")
      .then((res) => res.json())
      .then((data) => {
          console.log("Second render");
          setBikes(data);
      })
}, []);
const [renters, setRenters] = useState([]);
      useEffect(()=>{
        fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((data) => {
          console.log("First render");
          setRenters(data);
        })
      }, []);

const getStationId = station.filter(
  item =>{ 
     if(item.station_name === renting.station_name){
       return item.id;

     }
  })


 

  const handleSubmit = event => {

    event.preventDefault();
    setSubmitting(true);
      let stoppedDate=new Date().toString().slice(4, 25);
      console.log(stoppedDate)
      const object = { 
        "status": 'Rent finished',
        "finished_date": stoppedDate,
    }
    console.log(object);
    
    setTimeout(() => {
        if (window.confirm(`Do you want to cancel the renting by ${props.name} ${props.last_name} ?`)) {

            fetch(`http://localhost:3000/rentings/update/${props.params}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object),
            })
            
        };
        alert("Renting Updated!");
        props.setUpdate(!props.update)
        setSelectBike(bikes.filter(
          item => item.model_name === props.model_name
      ))
      
        
        setSubmitting(false);
        setShowPopUp(true)
    }, 500);

}

useEffect(() => console.log(selectBike), [selectBike])

const togglePop = () => {
  setShowPopUp(!showPopUp)
}

return (

    <div>
        <button onClick={handleSubmit} className="update-button" >Received</button>
      {showPopUp ? <PopUp id={selectBike[0]?.id} toggle={togglePop} /> : null}
    </div>
)
}

export default UpdateRenting;