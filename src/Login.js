import React,{useState,useEffect} from "react";
import './Login.css';
import { variables } from "./Variables.js";
import {Navigate} from "react-router-dom";

const Login=(props)=>{


  const [Email,setEmail]=useState('');
  const [Password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  useEffect(()=>
  {
    if(props.userEmail==='')
    setRedirect(false);
    else
    setRedirect(true);
    });

  const submit = async (e) =>
  {
      e.preventDefault();
try{
      const response = await fetch(variables.USER_URL+"/login",
      {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({
          Email,
          Password
        })
      });

      const content=await response.json();
      if(content.email===undefined||content.email==='')
      {

      }else{
        props.setGlobalEmail(content.email);
        setRedirect(true);
      }
    }catch (error) {
      var message="seems like no server connection";
        console.error(message,error);
        }
        

    }
    if(redirect)
    return <Navigate to="/"></Navigate>;

        return(
          <main className="form-signin">
            <div>
              <form onSubmit={submit}>
  
  <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

  <div className="form-floating">
    <input type="email" className="form-control" placeholder="name@example.com" required
    onChange={e => setEmail(e.target.value)}/>
   
  </div>
  <div className="form-floating">
    <input type="password" className="form-control" placeholder="Password" required
    onChange={e => setPassword(e.target.value)}/>
   
  </div>

 
  <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
</form>
            </div>
            </main>
        );
    };

export default Login;