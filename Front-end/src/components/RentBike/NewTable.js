import react, {useState} from "react";
import Alert from 'react-bootstrap/esm/Alert';
import {toast} from "react-toastify/dist";
const moment = require('moment');


const NewTable = (props) => {
    const [activeRow, setActiveRow] = useState("");
    const highlightRowClick = () => {
        if (activeRow === "") {
            toast.info("User Selected!")
            console.log("Highlight row");
            setActiveRow("table-row");
          } else {
            console.log("Remove highlight");
            setActiveRow("");
          }
    }

    let NewDate = "";
    let BirthDate = "";

    return (
        <tr 
            onClick={function(event){ 
              highlightRowClick();
              props.handleRowClick(event)}
            }
            variant="outline-success"
            id={activeRow}
            key={props.index} 
            
        > 
        <td data-title={props.item.id} className="id-number"> {props.item.id} </td>
        <td data-title={props.item.id}> {props.item.name} </td>
        <td data-title={props.item.id}> {props.item.last_name} </td>
        <td data-title={props.item.id}>  {
          ((NewDate = moment(new Date().toString())), 
           (BirthDate = moment(props.item.date_birth.slice(0,10))),
           NewDate.diff(BirthDate, "years"))+" y.o"
        }</td>
        <td data-title={props.item.id}> {props.item.phone_number} </td>
        </tr>
    )
}

export default NewTable;