import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VolunteerPanel from '../VolunteerPanel';
import DeleteBike from "./DeleteBike";
import SearchBicycle from "./SearchBicycle";
import Footer from "../Footer";
import FilterBikes from "./FilterBikes";
import ExportBikes from "./ExportBikes";

const AllBicycles = props => {
    const [bikes, setBikes] = useState([]);
    const [filteredBikes, setFilteredBikes] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/bikes")
            .then((res) => res.json())
            .then((data) => {
                console.log("First render");
                data = data.filter(
                    item => item.status !== "Damaged and not in use"
                );
                setBikes(data);
            })
    }, []);

    const search = searchVal => {
        console.info("TO DO!", searchVal);
        const filteredBicycles = bikes.filter(
            item => item.model_name === searchVal 
        );
        setFilteredBikes(filteredBicycles);
    };

    
   const searchBike = searchVal => {
    console.log(searchVal)
    console.info("new Filtered!", searchVal);
    const filteredStation = bikes.filter((item)=>{
      console.log("filteres",item)
      return item.station_name === searchVal 
    });
     setFilteredBikes(filteredStation);
    };

    return (
        <>
            <VolunteerPanel />
            <div className="wrapper">
                <div className="residents-wrapper">
                <div className="headerExport">
                    <h2 className="text-center">Bicycles</h2>
                    <ExportBikes/>   
                </div>
                    <Link to={'/addnewbicycle'}>
                        <button className="mt-5 btn btn-primary w-100" type="submit">Add New Bicycle</button>
                    </Link>
                    <div className="filters">
                    <SearchBicycle search={search} />
                    <FilterBikes searchBike={searchBike} />
                    </div>
                    {/* <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                         aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                        </span>
                    </div> */}
                    <div className="table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Model name</th>
                                    <th>Station</th>
                                    <th>Entry Date</th>
                                    <th>Conditions</th>
                                    <th>Current Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBikes?.length > 0 ? filteredBikes.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.model_name}</td>
                                        <td>{item.station_name}</td>
                                        <td>{item.entry_date}</td>
                                        <td>{item.conditions}</td>       
                                        <td>{item.status}</td>        
                                        <td>
                                            <Link to={'/updatebicycle/'+ item.id}>
                                                <button className="update-button">Update</button>
                                            </Link>
                                            <DeleteBike name={item.model_name} params={item.id}/>
                                        </td>
                                    </tr>

                                ))
                                    : 
                                    bikes.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.model_name}</td>
                                            <td>{item.station_name}</td>
                                            <td>{item.entry_date.slice(0,10)}</td>
                                            <td>{item.conditions}</td> 
                                            <td className={item.status}>{item.status}</td>                   
                                            <td>
                                                <Link to={'/updatebicycle/'+ item.id}>
                                                    <button className="update-button">Update</button>
                                                </Link>
                                                <DeleteBike name={item.model_name} params={item.id}/>
                                            </td>
                                        </tr>
    
                                    ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>)
}
export default AllBicycles;

