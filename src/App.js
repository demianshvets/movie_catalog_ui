import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes,NavLink } from 'react-router-dom';
import  Login  from './Login';
import Home from './Home.js';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Top navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" >
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
        <NavLink className="btn btn-light btn-outline-pimary" to="/">

Home
</NavLink>
        </li>
        <li className="nav-item">
         <NavLink className="btn btn-light btn-outline-pimary" to="/login">

           Login
         </NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul>
     
    </div>
  </div>
</nav>
      <main className="form-signin">
      
        <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/login" element={<Login/>} >
        </Route>
        </Routes>
        
  
</main>
    </div>
    </BrowserRouter>
  );
}

export default App;
