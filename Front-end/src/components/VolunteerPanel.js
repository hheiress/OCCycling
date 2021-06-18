import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import ProtectedRoute from '../components/Residents/ProtectedRoute.js';

// rent a bike
// see list of actual rentings
// list of residents and bicycles
// see and update list of bikes and renting history

function VolunteerPanel() {
    return (
        <nav className="headercontainer">
            <div className="navbar">
                <div className="logo">
                <img src="/images/OCC Logo White Transparant.png" className="occ-img"/>
                <h1 className="header-name">OCCycling</h1>
                <img src="/images/icon.svg" className="logo-img" />
                </div>
                <div className="menu" >
                    <Link to={'/rentbicycle'} className="page">
                        <button className="btn-nav" type="submit">Rent a Bicycle</button>
                    </Link>
                    <br />
                    <Link to={'/rentings'} className="page">
                        <button className="btn-nav" type="submit">Rentings</button>
                    </Link>
                    <Link to={'/protectresidents'} className="page">
                        <button className="btn-nav" type="submit">Residents</button>
                    </Link>
                    <br />
                    <Link to={'/bicycles'} className="page">
                        <button className="btn-nav"  type="submit">Bicycles</button>
                    </Link>
                    <Link to = "/dashboard"> Dashboard</Link>                 
                </div>
            </div>
        </nav>
    )
}

export default VolunteerPanel;





