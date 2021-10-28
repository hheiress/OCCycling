import React, {useState, useEffect} from "react";
import "./Bicycles.css";
import {Link} from "react-router-dom";
import VolunteerPanel from '../../VolunteerPanel';
import DeleteBike from "../UpdateBike/DeleteBike";
import SearchBicycle from "./Filters/SearchBicycle";
import Footer from "../../Footer";
import FilterBikes from "./Filters/FilterBikes";
import ExportBikes from "./ExportBikes";
import dynamicGetFetch from "./../../DymanicRequests/dynamicGetFetch";
import BikesTable from "./BikesTable";


const AllBicycles = props => {
    const [bikes, setBikes] = useState([]);
    const [filteredBikes, setFilteredBikes] = useState(null);
    const [update, setUpdate] = useState(false);

    const url = `/bikes`;

    useEffect(() => {
        dynamicGetFetch(url) 
        .then((data) => {
            data = data.filter(
                item => item.status !== "Damaged and not in use"
            );
         setBikes(data);
        })
    }, [update]);

    const search = searchVal => {
        const filteredBicycles = bikes.filter(
            item => {
                let nameMatches = item.model_name.includes(searchVal) || item.brand_name.includes(searchVal);
                let numberMatches = false;
                if (!isNaN(searchVal)) {
                    let bikeNumber = parseInt(searchVal);
                    numberMatches = bikeNumber === item.bike_number;
                }
                return nameMatches || numberMatches;
            }
        );
        setFilteredBikes(filteredBicycles);
    };


    const searchBike = searchVal => {
        const filteredStation = bikes.filter((item) => {
            return item.station_name === searchVal
        });
        setFilteredBikes(filteredStation);
    };

    return (
        <>
            <VolunteerPanel/>
            <div className="wrapper">
                <div className="bikes-wrapper">
                    <div className="headerExport">
                        <h2 className="text-center">Bicycles</h2>
                        <ExportBikes/>
                    </div>
                    <Link to={'/addnewbicycle'}>
                        <button className="mt-5 btn btn-primary w-100" type="submit">Add New Bicycle</button>
                    </Link>
                    <div className="filters">
                        <SearchBicycle search={search}/>
                        <FilterBikes searchBike={searchBike}/>
                    </div>
                    <div className="table">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Bike Number</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Station</th>
                                <th>Entry Date</th>
                                <th>Conditions</th>
                                <th>Current Status</th>
                                <th>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredBikes?.length > 0 ? filteredBikes.map((item, index) => (
                                    <BikesTable 
                                    item={item}
                                    index={index}/>
                                ))
                                :
                                bikes.map((item, index) => (
                                    <BikesTable 
                                    item={item}
                                    index={index}/>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer/>
        </>)
}
export default AllBicycles;

