import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes,NavLink } from 'react-router-dom';
import  Login  from './Login';
import  Register  from './Register';
import Home from './Home.js';
import { useEffect, useState } from 'react';
import { variables } from "./Variables.js";

function App() {
  const [userEmail, setUserEmail]=useState('' );

  useEffect(()=>
  {
    (
      async()=>
      {
        try{
        const response = await fetch(variables.USER_URL+'/user',
        {
          headers:{'Content-type':'application.json'},
          credentials:'include'
        });
        const content= await response.json();
        setUserEmail(content.email);  
      }
      catch (error) {
        
      console.error(error);
      }
      }

    )();
  });
  return (
    <BrowserRouter>
    <div className="App container">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div className="container-fluid">
  <NavLink  className="navbar-brand"  to="/">Home</NavLink>
  
    <div>
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
       
        </li>
        <li className="nav-item">
         <NavLink className="nav-link" to="/login">

           Login
         </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
      </ul>
     
    </div>
  </div>
</nav>
      
      
        <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        </Routes>
       
    </div>
     </BrowserRouter>
  );
}

export default App;
