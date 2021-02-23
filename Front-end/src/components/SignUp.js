import React, { useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

function SignUp({setAuth}) {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { name, email, password } = inputs;

    const onChange = e => {
        setInputs ({...inputs, [e.target.name] : e.target.value});
    }

    const onSubmitForm = async e => {
        e.preventDefault ();
        try {
            //storage in our DB
            const body = {name, email, password}
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()
            console.log(parseRes);

            if(parseRes.token) {
             localStorage.setItem("token", parseRes.token);

            setAuth(true);
            toast.success("Registered Success!")
            } else {
                setAuth(false)
                toast.error(parseRes);
            }
            
        } catch (err) {
            console.log(err.stack);
        }
    };

    return (
        <>
            <div className="wrapper-login">
                <div className="login">
                <form onSubmit = {onSubmitForm} className="form-signin">
                    <h2 className="text-center project-name"> Welcome to <span className="projectname-span"> OCCycling!</span></h2>
                    <input type="text" className="form-control mb-4" name="name" placeholder="Name" required="" autofocus="" value={name} onChange = {e => onChange(e)} />

                    <input type="email" className="form-control mb-4" name="email" placeholder="Email " required="" autofocus="" value={email} onChange = {e => onChange(e)} />

                    <input type="password" className="form-control mb-4" name="password" placeholder="Password" required="" value={password} onChange = {e => onChange(e)} />

                    <label className="checkbox">
                        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember Me
                    </label>
                        <button className="btn btn-lg btn-primary submit-button btn-block mb-5" type="submit">Register</button>
                        <Link to = "/login">Login</Link>
                </form>
                </div>
            </div>
        </>
    )
}
export default SignUp;