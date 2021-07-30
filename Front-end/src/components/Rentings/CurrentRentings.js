import react,{useState, useEffect} from "react";
import SetTimer from "../SetTimer";
import UpdateRenting from "./UpdateRenting";
import BannUser from "./BannUser"
const moment = require("moment");

const CurrentFunctions = () =>{
    const [currentRentings, setCurrentRentings] = useState([])
    const [update, setUpdate] = useState(false);

    useEffect (()=>{
    fetch("http://localhost:3000/rentings",{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => res.json())
      .then((data) => {
         data=data.filter(
            item => item.finished_date === null);
        setCurrentRentings(data);
      })
   }, [])

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
    return ( 
    <>
        <div className="table">
            <h3> Current Rentings</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Bicycle ID</th>
                        <th>User name</th>
                        <th>Renting date</th>
                        <th>Station</th>
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
                                <td>{item.model_name}</td>
                                <td>{item.name} {item.last_name}</td>
                                <td>{item.renting_date.slice(0,19)}</td>
                                <td>{item.station_name}</td>
                                <td><SetTimer
                                    dueDate={magic(item)}
                                /></td>
                                <td>{item.conditions}</td>
                                <td><UpdateRenting
                                    setUpdate={setUpdate}
                                    update={update} 
                                    params={item.id}
                                    model_name={item.model_name}
                                    name={item.name}
                                    last_name={item.last_name}
                                />
                                    <BannUser user_id={item.user_id}/>
                                </td>
                                <td>{item.finished_date}</td>
                             </tr>
                         )})
                    } 
                </tbody>
            </table>
        </div>
      </>  
       ) 
}
export default CurrentFunctions;