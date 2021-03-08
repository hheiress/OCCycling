import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

function ResetPassword () {
    return (
        <>
        <div className="wrapper-reset">
            <div className="reset-password">
            <form className="form-reset">
                <h2 className="text-center project-name"> OCCycling</h2><br/>
                <h4 className="text-center reset-header">Change password</h4><br/>
                <div className="text center reset-text">Please enter your new password.</div><br/>
                <input type="password" className="form-control mb-4" name="password" placeholder="New password" required="" autofocus=""   />     
                
                    <button  className="btn btn-lg btn-primary submit-button btn-block mb-5" type="submit">Save new password</button>  
                    <Link to = "/login">Login</Link>               
            </form>
            </div>
        </div>
    </>
    )
};

export default ResetPassword;