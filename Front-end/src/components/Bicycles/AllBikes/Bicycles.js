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

const applyFilters = (data, filters) =>{
    const filterByStation = data.filter((bike)=>bike.station_name.toLowerCase().includes(filters.station.toLowerCase()));
       const filterByName = filterByStation.filter((bike)=> bike.model_name.toLowerCase().includes(filters.bikeName.toLowerCase()));
       return filterByName;
}

const AllBicycles = props => {
    const [bikes, setBikes] = useState([]);
    const [filteredBikes, setFilteredBikes] = useState([]);
    const [bikeFilters, setBikeFilters] = useState({
        bikeName:"",
        station:""
    });

    const url = `/bikes`;

    useEffect(()=>{
        setFilteredBikes(applyFilters(bikes, bikeFilters))
    },[bikeFilters]);

    useEffect(() => {
        dynamicGetFetch(url) 
        .then((data) => {
            data = data.filter(
                item => item.status !== "Damaged and not in use"
            );
         setBikes(data);
         setFilteredBikes(applyFilters(data, bikeFilters))
        })
    }, []);

    const search = searchVal => {
        setBikeFilters((prev)=>{
            return {...prev,
            bikeName:searchVal}
        })
    };


    const searchBike = searchVal => {
        setBikeFilters((prev)=>{
            return {...prev,
            station:searchVal}
        })
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
                        <BikesTable 
                        filteredBikes={filteredBikes}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>)
}
export default AllBicycles;

