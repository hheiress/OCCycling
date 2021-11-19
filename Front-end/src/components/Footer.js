import React from 'react';
import occlogo from "../images/OCC Logo White Transparant.png";

function Footer() {
    return (
        <div className="footercontainer">
                <div className="logo">
                <a href="https://migracode.openculturalcenter.org/" target="_blank"> <img src={occlogo} className="footer-img"/></a> 
                </div>
        </div>
    )
}

export default Footer;





