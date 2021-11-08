import React,{useState} from "react";
import './Login.css';
import {Navigate} from "react-router-dom";
import { variables } from "./Variables.js";

const Register=()=>{
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);

    const submit = async (e) =>
    {
        e.preventDefault();

        const response = await fetch(variables.USER_URL+"/register",
        {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            Email,
            Password
          })
        });

        const content=await response.json();
        console.log({
          content
        })

setRedirect(true);
    }
    if(redirect)
    return <Navigate to="/login"></Navigate>;

    return( <main className="form-signin">
    <div>
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Register</h1>
            
  <div className="form-floating">
    <input type="email" className="form-control" placeholder="name@example.com" required
    onChange={e => setEmail(e.target.value)}/>
   
  </div>
  <div className="form-floating">
    <input type="password" className="form-control" placeholder="Password" required
    onChange={e => setPassword(e.target.value)}/>
   
  </div>

 
  <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>
            </div>
            </main>
    );
};

export default Register;