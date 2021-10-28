import react, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";

const ExportBikes = () =>{
    const [bikes, setBikes] = useState([]);

    const urlBikes =`/bikes`;

    useEffect(()=>{
      dynamicGetFetch(urlBikes)
      .then((data) => {
        ("First render");
        setBikes(data);
      })
    }, []);

    return (
        <>
          <div className="export"> 
            <CSVLink
            data={bikes}
            filename={"bikes.csv"}
            className="btn btn-primary export-button"
            target="_blank"
            > Export </CSVLink>
            </div>
        </>
    )
}

export default ExportBikes;