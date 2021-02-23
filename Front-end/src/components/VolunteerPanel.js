import React from 'react';
import { Link } from "react-router-dom";
// rent a bike
// see list of actual rentings
// list of residents and bicycles
// see and update list of bikes and renting history

function VolunteerPanel() {
    return (
        <nav className="headercontainer">
            <div className="navbar">
                <div className="logo">
                <h1 className="header-name">OCCycling</h1>
                <img src="/images/icon.svg" className="logo-img" />
                </div>
                <div className="menu">
                    <Link to={'/rentbicycle'}>
                        <button className="btn-nav" type="submit">Rent a Bicycle</button>
                    </Link>
                    <br />
                    <Link to={'/rentings'}>
                        <button className="btn-nav" type="submit">Rentings</button>
                    </Link>
                    <Link to={'/residents'}>
                        <button className="btn-nav" type="submit">Residents</button>
                    </Link>
                    <br />
                    <Link to={'/bicycles'}>
                        <button className="btn-nav" type="submit">Bicycles</button>
                    </Link>
                    <Link to = "/dashboard">Dashboard</Link>                 
                </div>
            </div>
        </nav>
    )
}

export default VolunteerPanel;





