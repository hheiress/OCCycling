import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import SetTimer from '../SetTimer';
import RentBicycle from './RentBicycle';

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
function AddTime() {

    const [dataForm, setTimeData] = useState();
    const options = [
        {
          label: "1 hour",
          value: "1",
        },
        {
          label: "2 hours",
          value: "2",
        },
        {
          label: "3 hours",
          value: "3",
        },
        {
          label: "4 hours",
          value: "4",
        },
      ];

    // const hours = option.value: dataForm.;
    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
      }
    // alert(new Date().addHours(4));
    
   const handleChange = event => {
        console.log("Time Selected!!");
        setTimeData({ 
            options: event.target.name,
            options: event.target.value
           
         });
         console.log(event.target.value);
      }
    return (
            <div>
                <h4 className="addtime-header mt-3">Add Time</h4>
                
                <Form.Control
                as="select"
                name="starting_time"
                onChange={handleChange}
                value={setTimeData.starting_time}
                required>
                <option value="">-- Select --</option>
                        {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                        ))}
              </Form.Control> 
              <div> 
            <SetTimer futureDate={new Date().addHours(4)}/>
        </div>
                {/* <button className="mt-5 btn btn-primary w-100" type="submit" onClick={handleSubmit}>Submit</button> */}
            </div>
     
    )
}

export default AddTime;