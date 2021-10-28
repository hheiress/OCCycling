import react, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";

const ExportRentings = () =>{
    const [rentings, setRentings] = useState([]);
    const [dataRentings, setDataRentings] = useState({});

    const urlRentings = `/rentings`;
    useEffect(()=>{
      dynamicGetFetch(urlRentings)
      .then((data) => {
        ("First render");
        setRentings(data);
        })
    }, []);

    return (
        <>
        <div className="export"> 
            <CSVLink
            data={rentings}
            filename={"my-file.csv"}
            className="btn btn-primary export-button"
            target="_blank"
            >
               Export
            </CSVLink>
        </div>
        </>
    )
}

export default ExportRentings;