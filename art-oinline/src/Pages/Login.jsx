import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";  

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false); 

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault(); 

        const response = await fetch('http://localhost:3001/api/login', {  
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();

        setRedirect(true);
        props.setName(content.name);
        navigate('/dashboard');
    }
    
    if (redirect) {
        return <Navigate to="/" />;
    }
    
    return (
        <div className="auth-form-container">
            <form className= "login-form" onSubmit={submit}>
                <img className="logo" src="Logo.png" alt="" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" placeholder="Email address"
                        onChange={e => setEmail(e.target.value)}    
                    />
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            </form>
        </div>
    );
};

export default Login;