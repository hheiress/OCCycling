import React, {useState} from "react";
import NewPopUp from "./NewPopUp";

const UpdatePopUpBtn = ({open}) => { 
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const hanldeClick = (selectedRec) => {
    setSelectedData(selectedRec);
    setShow(true);
  };

    return (
        <div>
            <button onClick={hanldeClick} className="update-button" >Received</button>
        </div>
    )
};

export default UpdatePopUpBtn;
