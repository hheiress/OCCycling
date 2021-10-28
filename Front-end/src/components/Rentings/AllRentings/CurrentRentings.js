import react,{useState, useEffect} from "react";
import SetTimer from "../../SetTimer";
import BannUser from "../BannUser/BannUser"
import NewPopUp from "../PopUp/NewPopUp"
import UpdatePopUpBtn from "../PopUp/UpdatePopUpBtn";
import { Link } from "react-router-dom";
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";

const moment = require("moment");

const CurrentFunctions = () =>{
    const [currentRentings, setCurrentRentings] = useState([]);
    const [update, setUpdate] = useState(false);

    const urlRentings = `/rentings`;
    
    useEffect (()=>{
      dynamicGetFetch(urlRentings)
      .then((data) => {
         data=data.filter(
            item => item.finished_date === null );
        setCurrentRentings(data);
      })
   }, [update])

 const sortedRentings = currentRentings.sort(
   (a,b)=>{
     return new Date(b.renting_date) - new Date(a.renting_date);}
 )

  function magic(item){
    if(item.finished_date===null){
      let rentingDuration = moment.duration (item.starting_time);
      const rentingDate = moment(item.renting_date);
      const resultOfDuration = rentingDate.add(rentingDuration)
   return resultOfDuration;
  }
}
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const hanldeClick = (selectedRec) => {
    setSelectedData(selectedRec);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };
    return ( 
    <>
        <div className="table">
            <h3> Current Rentings</h3>
            <h5 className="more-info">The number of current rentings is: {currentRentings.length}</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>Bicycle Number</th>
                        <th>Model Name</th>
                        <th>User name</th>
                        <th>Renting date</th>
                        <th>Start Station</th>
                        <th>Time left</th>
                        <th>Condition</th>
                        <th></th>
                        <th>Finished date</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRentings.map((item, index) => {
                        return(
                            <tr key={index}>
                                <td className="id-number">{item.bike_number}</td>
                                <td>{item.model_name}</td>
                                <td>{item.name} {item.last_name}</td>
                                <td>{item.renting_date.slice(11,19)} - {item.renting_date.slice(0,10)}</td>
                                <td>{item.location_start_name}</td>
                                <td><SetTimer
                                    dueDate={magic(item)}
                                /></td>
                                <td>{item.conditions}</td>
                                <td>
                                    <Link to={"#"} onClick={() => hanldeClick(item)}>
                                        <button onClick={hanldeClick} className="update-button" >Received</button>
                                    </Link>
                                    <BannUser user_id={item.user_id}/>
                                </td>
                                <td>{item.finished_date}</td>
                             </tr>
                         )})
                    } 
                </tbody>
            </table>
            {show && <NewPopUp 
             details={selectedData}
             params={selectedData.id}
             setUpdate={setUpdate}
             update={update} 
             handleClose={hideModal} />}
        </div>
      </>  
       ) 
}
export default CurrentFunctions;