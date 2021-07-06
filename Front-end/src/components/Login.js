import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

function Login( {setAuth} ) {

    const [inputs, setInputs] = useState({
        email:"",
        password: ""
    })

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    }; 

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try{
            const body = { email, password };
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }); 

            const parseRes = await response.json();

            console.log(parseRes) //token validate in console

            if (parseRes.token) {
            localStorage.setItem("token", parseRes.token); 

            setAuth(true);
            toast.success("Login Success!")
            } else {
                setAuth(false)
                toast.error(parseRes);
            }
  
        } catch (err) {
            console.log(err.stack)
        }
    }

    return (
        <>
            <div className="wrapper-login">
                <div className="login">
                <form onSubmit = {onSubmitForm} className="form-signin">
                    <h2 className="text-center project-name"> OCCycling</h2>

                    <input type="email" className="form-control mb-4" name="email" placeholder="Email Address" required="" autofocus="" value={email} onChange = {e => onChange(e)} />

                    <input type="password" className="form-control mb-4" name="password" placeholder="Password" required="" value={password} onChange = {e => onChange(e)} />

                    <label className="checkbox">
                        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" /> Remember Me
                    </label>
                    {/* Delete LINK class, Use Redirect in app.js in route Login and set to Auth */}
                        <button  className="btn btn-lg btn-primary submit-button btn-block mb-5" type="submit">Login</button>  
                        <Link to = "/signup">SignUp</Link><br/>
                        {/* <Link to = "/forgot-password">Forgot password?</Link>  */}
                </form>
                </div>
            </div>
        </>
    )
}
export default Login