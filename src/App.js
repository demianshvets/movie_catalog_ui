import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes,NavLink } from 'react-router-dom';
import  Login  from './Login';
import  Register  from './Register';
import Home from './Home.js';
import { useEffect, useState } from 'react';
import { variables } from "./Variables.js";

function App() {
  const [userEmail, setUserEmail]=useState('');
  let menu;

  const logout = async () =>
  {
    
   await fetch(variables.USER_URL+"/logout",
    {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include',
      
    });
    setUserEmail('');
    
  }


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
       
        if(content.email===undefined||content.email==='')
        {

        }else{
          setUserEmail(content.email);
        }
          
      }
      catch (error) {
        
      console.error(error);
      }
      }

    )();
  });

if(userEmail==='')
{
  menu =(
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
  )

} else {
menu = (
  <ul className="navbar-nav me-auto mb-2 mb-md-0">
  <li className="nav-item">
 
  </li>
  <li className="nav-item">
   <NavLink className="nav-link" to="/login" onClick={logout}>

     Logout
   </NavLink>
  </li>
</ul>
)
}

  return (
    <BrowserRouter>
    <div className="App container">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div className="container-fluid">
  <NavLink  className="navbar-brand"  to="/">Home</NavLink>
  
    <div>
    {menu}
     
    </div>
  </div>
</nav>
      
      
        <Routes>
        <Route path="/" exact element={<Home email={userEmail}/>}/>
        <Route path="/login" element={<Login setGlobalEmail={setUserEmail}/>} />
        <Route path="/register" element={<Register/>} />
        </Routes>
       
    </div>
     </BrowserRouter>
  );
}

export default App;
