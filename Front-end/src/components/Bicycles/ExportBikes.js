import react, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";


const ExportBikes = () =>{
    const [bikes, setBikes] = useState([]);
    const [dataBikes, setDataBikes] = useState({});

    useEffect(()=>{
        fetch("http://localhost:3000/bikes",{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((res) => res.json())
        .then((data) => {
          ("First render");
          setBikes(data);
        })
      }, []);

    useEffect(()=>{

    },[])
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