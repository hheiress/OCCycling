import React from 'react';
import { Link } from "react-router-dom";
function SignUp() {
    return (
        <>
            <div className="wrapper-login">
                <div className="login">
                <form className="form-signin">
                    <h2 className="text-center project-name"> Welcome to <span className="projectname-span"> OCCycling!</span></h2>
                    <input type="text" className="form-control mb-4" name="username" placeholder="Name" required="" autofocus="" />
                    <input type="email" className="form-control mb-4" name="email" placeholder="Email " required="" autofocus="" />
                    <input type="password" className="form-control mb-4" name="password" placeholder="Password" required="" />
                    <label className="checkbox">
                        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember Me
                    </label>
                        <button className="btn btn-lg btn-primary submit-button btn-block mb-5" type="submit">Register</button>
                </form>
                </div>
            </div>
        </>
    )
}
export default SignUp;