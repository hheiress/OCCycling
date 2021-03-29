import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function ForgotPassword ( ) { 
    
    const [inputs, setInputs] = useState ({
        email: ""
    });
    
    const [emailSent, setEmailSent] = useState(false);
    
    const { email } = inputs;

    const onChange = (e) => {
        setInputs ({...inputs, [e.target.name] : e.target.value});
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {
            const body = { email };
            const response = await fetch("http://localhost:3000/resetlink/forgot_password", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            console.log(body)
            console.log(parseRes)
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);

                setEmailSent(true);
                toast.success("Reset link has been successfully sent to your inbox")
            } else {
                setEmailSent(false)
                toast.error(parseRes)
            }
            
        } catch (err) {
            console.log(err.stack)
        }
    }

    return (
        <>
        <div className="wrapper-forgot">
            <div className="forgot-password">
            <form onSubmit = {onSubmitForm}className="form-forgot">
                <h2 className="text-center project-name"> OCCycling</h2><br/>
                <h4 className="text-center forgot-header">Trouble Logging In?</h4><br/>
                <div className="text center forgot-text">Enter your email, and we'll send you a link to get back into your account.</div><br/>
                <input type="email" className="form-control mb-4" name="email" placeholder="Email Address" required="" autofocus="" value={email} onChange = {e => onChange(e)} />     
                
                    <button  className="btn btn-lg btn-primary submit-button btn-block mb-5" type="submit">Get reset Link</button>  
                    <Link to = "/login">Login</Link>               
            </form>
            </div>
        </div>
    </>
    )
};

export default ForgotPassword;