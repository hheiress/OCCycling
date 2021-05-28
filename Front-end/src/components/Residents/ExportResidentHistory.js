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
        <CSVLink
            data={residents}
            filename={"residents.csv"}
            className="btn btn-primary"
            target="_blank"
        >
        <button>Export</button>
        </CSVLink>

        </>
    )
}

export default ExportResidents;