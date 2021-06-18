import React, {useState, useEffect } from "react";
import VolunteerPanel from "../VolunteerPanel";

const History = (props)=>{
    console.log(props.match.params.id);
    console.log(props.match.params.name);
    const [rentings, setRentings] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:3000/rentings",{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
              }
            })
        .then((res) => res.json())
        .then((data) => {
              console.log("First render");console.log("First render");
              let rentings = data.filter(x => x.user_id == props.match.params.id)
              console.log(rentings)
              setRentings(rentings)
            //   setRentings({
            //        type: 'fetch',
            //        rentings:rentings});
            // })
          }, [setRentings, props.match.params.id]);
        })
    return(
        <>
        <VolunteerPanel />
        <div className="wrapper">
        <h1 className="header-history">History</h1>
            <div className="residents-history-wrapper">
                <ul className="user-history">
                    {rentings?.length > 0 ? rentings.map((item, index) => (
                        <li className="user-li" key={index}>
                          <span className="user-history-list">Bike:</span> {item.model_name}<br/>
                          <span className="user-history-list"> Renting Time:</span>{item.renting_date.slice(0,19)}<br/>
                          <span className="user-history-list">Finished Rent:</span> {item.finished_date.slice(0,19)}<br/>
                          <span className="user-history-list">Starting Station: </span>{item.station_name}<br/>
                        </li>
                        )
                    )
                    : <p>History to update!</p> 
                        
                }
                </ul>
            </div>
        </div>
    </> 
    )
}
export default History;