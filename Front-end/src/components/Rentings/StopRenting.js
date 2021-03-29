import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import SetTimer from '../SetTimer';
import RentBicycle from './RentBicycle';
import Rentings from './Rentings';

// const formReducer = (state, event) => {
//         if (event.reset) {
//           return {
//             starting_time: '',
//           }
          
//         }
//         return {
//           ...state,
//           [event.name]: event.value
//         }
//       }
function StopRenting() {

    const [dataForm, setTimeData] = useState();
    
   const handleChange = event => {
        console.log("Time Selected!!");
        setTimeData({ 
            options: event.target.name,
            options: event.target.value
           
         });
         console.log(event.target.value);
      }
      // const unmount = this.props.componentWillUnmount;
      let stoppedDate=new Date().toString().slice(4, 25)
      console.log(stoppedDate)
      let stopped=()=>{
        console.log("stopped with date " + stoppedDate)
      }

    return (
          <div>
                <button className="update-button" onClick={stopped}>Received</button>
                {/* <td>{stoppedDate}</td> */}
          </div>
    )
}

export default StopRenting;