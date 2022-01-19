import { Component } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Passwords from "./components/Passwords";
import Home from "./components/Home";
import Master from "./components/Master";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { logout } from "./api/auth";
import { checkToken } from "./api/api";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    }
  }
  
  componentDidMount () {
    console.log(this.props);
    checkToken().then(([data, errors]) => {
      if (errors) {
        console.error(data);        
        this.logoutUser();
      } else {
        this.setState({ logged: true });
      }
    })
  }

  logoutUser = () => {
    this.setState({ logged: false });
    logout();
    // this.props.history.push("/");
  }

  loginUser = (token) => {
    this.setState({ logged: true});
    localStorage.setItem("passToken", token);
  }

  render () {
    return (
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none" href='/'>
            <svg className="bi me-2" width="40" height="32"></svg>
            <span className="fs-4">Password wallet</span>
          </a>        
          <nav className="nav nav-pills">
            <a className="nav-link" aria-current="page" href="/">Home</a>
            { this.state.logged && (
              <>
                <Link className="nav-link" to="/passwords">Passwords</Link>
                <Link className="nav-link" to="/master">Change password</Link>
              </>
              )
            }
            { !this.state.logged && (
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/signup">Sign up</Link>
              </>
            )
            }
            { this.state.logged && (
              <a className="nav-link" href="/login" onClick={this.logoutUser}>Logout</a>
              )
            }
          </nav>
        </header>
        <div>
          <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/login" element={<Login onLogin={this.loginUser}/>} />
              <Route exact path="/signup" element={<Signup/>} />
              <Route exact path="/passwords" element={<Passwords logout={this.logoutUser}/>} />
              <Route exact path="/master" element={<Master logout={this.logoutUser}/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
