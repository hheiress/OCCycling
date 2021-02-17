import React from 'react';
import { Link } from "react-router-dom";
function Login() {
    return (
        <>
            <div className="wrapper-login">
                <div className="login">
                <form className="form-signin">
                    <h2 className="text-center project-name"> OCCycling</h2>
                    <input type="text" className="form-control mb-4" name="username" placeholder="Email Address" required="" autofocus="" />
                    <input type="password" className="form-control mb-4" name="password" placeholder="Password" required="" />
                    <label className="checkbox">
                        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember Me
                    </label>
                    <Link to={'/volunteerpanel'}>
                        <button className="btn btn-lg btn-primary submit-button btn-block mb-5" type="submit">Login </button>
                    </Link>
                   
                </form>
                </div>
            </div>
        </>
    )
}
export default Login