import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

function ResetPassword () {
    return (
        <>
        <div className="wrapper-forgot">
            <div className="forgot-password">
            <form onSubmit = {onSubmitForm}className="form-forgot">
                <h2 className="text-center project-name"> OCCycling</h2><br/>
                <h4 className="text-center forgot-header">Trouble Logging In?</h4><br/>
                <div className="text center forgot-text">Enter your email, and we'll send you a link to get back into your account.</div><br/>
                <input type="password" className="form-control mb-4" name="password" placeholder="Password" required="" autoFocus="" value={email} onChange = {e => onChange(e)} />     
                
                    <button  className="btn btn-lg btn-primary submit-button btn-block mb-5" type="submit">Get reset Link</button>  
                    <Link to = "/login">Login</Link>               
            </form>
            </div>
        </div>
    </>
    )
};

export default ResetPassword;