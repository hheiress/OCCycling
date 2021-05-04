import React, {useState, useEffect, useReducer} from 'react';

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
  const [station, setStation] = useState([]);

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

const getBikeId = bikes.filter(
  item => {
    if(item.model_name === renting.model_name ){
      return item.id;
    }
  }
) 
const getUserId = renters.filter(
  item => {
    if(item.name === renting.name && item.last_name === renting.last_name){
      return item.id;
    }
  }
) 
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
        "bike_id": getBikeId[0].id,
        "user_id": getUserId[0].id,
        "last_name": getUserId[0].id,
        "status": 'Not Active',
        "renting_date": renting.renting_date,
        "station_id": getStationId[0].id,
        "starting_time": renting.starting_time,
        "conditions_id": getBikeId[0].id,
        "finished_date": stoppedDate,
    }
    console.log(object);
    
    setTimeout(() => {
        if (window.confirm(`Do you want to cancel the renting by ${props.name} ${props.last_name} ?`)) {

            fetch(`http://localhost:3000/rentings/${props.params}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object),
            })
            
        };
        alert("Renting Updated!");
        
        setSubmitting(false);
    }, 500);

}

return (

    <div>
        <button onClick={handleSubmit} className="update-button" >Received</button>
    </div>
)
}

export default UpdateRenting;