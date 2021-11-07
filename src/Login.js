import React,{useState} from "react";
import './Login.css';
import { variables } from "./Variables.js";

const Login=()=>{
  const [Email,setEmail]=useState('');
  const [Password,setPassword]=useState('');
  const submit = async (e) =>
  {
      e.preventDefault();

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
      console.log({
        content
      })
    }
  
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