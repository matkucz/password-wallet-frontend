import { useState } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Passwords from "./components/Passwords";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App(props) {
  const [ logged, setLogged ] = useState(true);
  
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none" href='/'>
          <svg className="bi me-2" width="40" height="32"></svg>
          <span className="fs-4">Password wallet</span>
        </a>        
        <nav className="nav nav-pills">
          <a className="nav-link" aria-current="page" href="/">Home</a>
          { logged && (
            <>
              <Link className="nav-link" to="/passwords">Passwords</Link>
              {/* redirect to new component */}
              {/* <Link className="nav-link" to="/password/change">Change password</Link> */}
            </>
            )
          }
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/signup">Sign up</Link>
          { logged && (
            <a className="nav-link" href="/logout">Logout</a>
            )
          }
        </nav>
      </header>
      <div>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/passwords" element={<Passwords/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
