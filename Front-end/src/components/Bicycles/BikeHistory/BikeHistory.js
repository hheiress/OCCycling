import React, {useState, useEffect } from "react";
import VolunteerPanel from "../../VolunteerPanel";
import Accordion from 'react-bootstrap/esm/Accordion';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";
import icon from "../../../images/icon.svg";


const UserHistory = (props)=>{
    const [rentings, setRentings] = useState([]);
    const [open, setOpen] = useState(false);
    const urlRentings=`/rentings`;

    useEffect(()=>{
        dynamicGetFetch(urlRentings)
        .then((data) => {
            console.log("First render");
              let rentings = data.filter(x => x.bike_id == props.match.params.id)
              setRentings(rentings)
          }, [setRentings, props.match.params.id]);
        })
    return(
        <>
        <VolunteerPanel /> 
        <div className="wrapper">
            <h1 className="header-history"><hr width="20%"/></h1>
            <h1 className="header-history"><span className="bike-word">Bike</span>  History</h1>
            <div className="residents-history-wrapper"> 
                <div className="user-history">
                    {rentings?.length > 0 ? rentings.map((item, index) => (
                        <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>{item.name} {item.last_name}
                          <KeyboardArrowDownIcon/>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className="history-block"  key={index}>
                            <img class="logo-img" src={icon} alt="logo"/> 
                            <div className="user-history-list">
                                <h3 className="user-history-list">{item.name} {item.last_name}</h3>
                                <p className="user-history-text">Start: <span className="text-date">{item.renting_date.slice(0,10)} Time-{item.renting_date.slice(11,19)}</span></p>
                                <p className="user-history-text">End: <span className="text-date">{item.finished_date}</span></p>
                                <p className="user-history-text"> Start: {item.location_start_name} ---  End: {item.location_end_name}</p>
                                <p className="user-history-text"> </p>
                            </div> 
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                        )
                    )
                    : <p className="text-center">History to update!</p> 
                        
                }
                </div>
            </div>
        </div>
    </> 
    )
}
export default UserHistory;