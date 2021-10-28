import React, {useState} from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import Residents from './AllRenters/Residents';
import VolunteerPanel from '../VolunteerPanel';
import Footer from '../Footer';

const ProtectedRoute = () => {
    const history = useHistory();
    const [searchInput, setSearchInput] = useState("");
    const [isNotVerified, setIsNotVerified] = useState(false);
    

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    }; 
    const handleSubmit = event => {
        event.preventDefault();
        console.log("Submited")
        const isAuthenticated = "BikePoli17";
        if(isAuthenticated===searchInput){
            return history.push('/residents')
        }else {
            return setIsNotVerified(true) 
        }
      };
    return (    
        <>
        <VolunteerPanel />
        <div className={'protect-residents-wrapper'}>
            <h2 className="project-name">OCCycling</h2>
            <h3>Verify the permission to access to the private data</h3>
            <form className="form-group search-box" onSubmit={handleSubmit}>
            <input 
            type="password" 
            className="form-control mb-4" 
            name="password" 
            placeholder="Insert the password"
            required="" 
            value={searchInput}
            onChange = {handleChange}
            />
           {isNotVerified ? <div> Not found, ask for the password to coordinator. </div> : ""}
            <button onSubmit={handleSubmit} className="btn btn-primary" >Verify</button>
            </form> 
        </div>
        <Footer />
        </>
    )
}

export default ProtectedRoute;
