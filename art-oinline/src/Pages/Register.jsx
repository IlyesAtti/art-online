import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:3001/api/register', {  
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="auth-form-container">
            <form className= "register-form" onSubmit={submit}>
                <img className="logo" src="Logo.png" alt="" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <input type="text" className="form-control" placeholder="Name" required
                    onChange={e => setName(e.target.value)}
                />

                <input type="email" className="form-control" placeholder="Email address" required
                    onChange={e => setEmail(e.target.value)}
                />

                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />

                <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register;
