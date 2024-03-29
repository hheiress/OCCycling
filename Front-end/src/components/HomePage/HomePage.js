import React from 'react';
import { Link } from "react-router-dom";
import Footer from '../Footer';
import './HomePage.css';
import icon from "../../images/icon.svg";
import logo from "../../images/Migracode Barcelona Logo (Dark Background).png";


function HomePage() {
    return (
        <>
            <div className="wrapper-login">
                <div className="login">
                <img src={logo} className="img"/> 
                <div className="homepage-block">
                    <img src={icon} className="img" />
                    <h2 className="text-center homepage-name"> OCCycling</h2>
                    <Link to={'/login'}>
                        <button className="btn btn-lg btn-primary submit-button btn-block" type="submit">Login </button>
                    </Link>
                    <Link to={'/signup'}>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                    </Link>
                    <p className="text-center homepage-text"> START YOUR WAY WITH US!</p>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default HomePage;