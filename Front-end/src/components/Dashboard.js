import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";


function Dashboard ( {setAuth} )  {

    const [name, setName] = useState("");

    async function getName () {
        try {
            const response = await fetch("http://localhost:3001/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            });

          const parseRes = await response.json();
          setName(parseRes.user_name)
        
        } catch (err) {
        console.error(err.stack)
    }
}

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out sucessfully!")
    }

    useEffect(() => {
        getName()
    }, [])

    return (
    <Fragment>
        <div className="dashboard">
    <h1 className="text-center dashboard">Welcome! {name}</h1>
            <button  className="btn btn-lg btn-primary 
        submit-button btn-block mb-3" type="submit" onClick = {e => logout(e)} > Logout </button> <br />
         <Link to={'/volunteerpanel'}> 
            <button className="btn btn-lg btn-primary submit-button btn-block  mb-5" type="submit">Panel</button>
        </Link>
        </div>
         
    </Fragment>
    );
};

export default Dashboard;