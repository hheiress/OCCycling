import React, {useState, useEffect } from "react";
import VolunteerPanel from "../../VolunteerPanel";
import HistoryButtons from "./HistoryButtons";
import Accordion from 'react-bootstrap/esm/Accordion';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const UserHistory = (props) =>{
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
              let rentings = data.filter(x => x.user_id == props.match.params.id)
              setRentings(rentings)
          }, [setRentings, props.match.params.id]);
        })
        console.log(rentings);
        const sortedRentings = rentings.sort(
            (a,b)=>{
              return new Date(b.renting_date) - new Date(a.renting_date);}
          )
    return(
        <>
        <VolunteerPanel />
        <div className="wrapper">
        <HistoryButtons user_id={props.match.params.id}
                        user_name={props.match.params.user_name}
                        user_last_name={props.match.params.user_last_name}
                      />
        <h1 className="header-history"><hr width="20%"/></h1>
        <h1 className="header-history"><span className="bike-word">User </span> History</h1>
            <div className="residents-history-wrapper">
                <div className="user-history">
                    {sortedRentings?.length > 0 ? sortedRentings.map((item, index) => (
                       <Accordion>
                       <Accordion.Item eventKey="0">
                         <Accordion.Header>{item.model_name}
                         <KeyboardArrowDownIcon/>
                         </Accordion.Header>
                         <Accordion.Body>
                       <div className="history-block" key={index}>
                            <img class="logo-img" src="/images/icon.svg" alt="logo"/> 
                                <div className="user-history-list"> 
                                    <h3 className="user-history-list" >{item.model_name}</h3>
                                    <p className="user-history-text">Start: <span className="text-date">{item.renting_date.slice(0,10)} Time-{item.renting_date.slice(11,19)}</span></p>
                                    <p className="user-history-text">End: <span className="text-date">{item.finished_date}</span></p>
                                    <p className="user-history-text"> Station Start: {item.location_start_name}</p>
                                    <p className="user-history-text"> Station End: {item.location_end_name}</p>
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