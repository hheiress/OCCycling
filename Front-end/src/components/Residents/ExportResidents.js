import react, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";


const ExportResidents = () =>{
    const [residents, setResidents] = useState([]);
    const [dataResidents, setDataResidents] = useState({});

    useEffect(()=>{
        fetch("http://localhost:3000/users",{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("First render");
          setResidents(data);
        })
      }, []);

    useEffect(()=>{

    },[])
    return (
        <>
          <div className="export"> 
            <CSVLink
            data={residents}
            filename={"residents.csv"}
            className="btn btn-primary export-button"
            target="_blank"
            > Export </CSVLink>
            </div>
        </>
    )
}

export default ExportResidents;