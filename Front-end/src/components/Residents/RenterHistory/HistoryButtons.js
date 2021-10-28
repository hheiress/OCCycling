import react, {useState} from "react";
import Button from 'react-bootstrap/esm/Button';
import { Link } from "react-router-dom";


function HistoryButtons(props) {
  return (
    <>
      <div>
           <Link to={'/userhistory/'+ props.user_id}
            user_name={props.user_name}
            user_last_name={props.user_last_name}> 
               <Button variant="success" className="user-history-buttons">Renting History</Button> 
          </Link>
          <Link to={'/bannhistory/'+ props.user_id}
            user_name={props.user_name}
            user_last_name={props.user_last_name}>
              <Button  variant="warning" className="user-history-buttons">Bann History</Button> 
          </Link>
      </div>
    </>
  );
}

export default HistoryButtons;