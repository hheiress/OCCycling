import react, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";


const ExportRentings = () =>{
    const [rentings, setRentings] = useState([]);
    const [dataRentings, setDataRentings] = useState({});

    useEffect(()=>{
        fetch("http://localhost:3000/rentings",{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((res) => res.json())
        .then((data) => {
          ("First render");
          setRentings(data);
        })
      }, []);

    useEffect(()=>{

    },[])
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