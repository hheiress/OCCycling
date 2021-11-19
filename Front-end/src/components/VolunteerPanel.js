import {React, useState} from 'react';
import { Link } from "react-router-dom";
import icon from "../images/icon.svg";
import occlogo from "../images/OCC Logo White Transparant.png";


// rent a bike
// see list of actual rentings
// list of residents and bicycles
// see and update list of bikes and renting history

function VolunteerPanel() {

    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
      }
    return (
        <nav className="headercontainer">
            <div className="navbar">
                <div className="logo">
                <img src={occlogo} className="occ-img"/>
                <h1 className="header-name">OCCycling</h1>
                <img src={icon} className="logo-img" />
                </div>
                <div className="burger">
                    <button className="burgerbtn" onClick={handleToggle}>&#x2630;</button>
                    <div className="menu" id={navbarOpen ? "open" : ""} >
                        <Link to={'/rentbicycle'} className="page">
                            <button className="btn-nav" type="submit">Rent a Bicycle</button>
                        </Link>
                        <Link to={'/rentings'} className="page">
                            <button className="btn-nav" type="submit">Rentings</button>
                        </Link>
                        <Link to={'/protectresidents'} className="page">
                            <button className="btn-nav" type="submit">Residents</button>
                        </Link>
                        <Link to={'/bicycles'} className="page">
                            <button className="btn-nav"  type="submit">Bicycles</button>
                        </Link>
                        <Link to = {'/dashboard'} className="page"> 
                            <button className="btn-nav"  type="submit">Dashboard </button>
                        </Link>                 
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default VolunteerPanel;





