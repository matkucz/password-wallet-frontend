import { useState } from "react";

function App (props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleInput = (event) => {
        switch (event.target.id) {
          case "login":
            setLogin(event.target.value);
            break;
          case "password":
            setPassword(event.target.value);
            break;
          default:        
            break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("login: ", login, password);
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none" href='/'>
                    <svg className="bi me-2" width="40" height="32"></svg>
                    <span className="fs-4">Password wallet</span>
                </a>        
                <nav className="nav nav-pills">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                    <a className="nav-link" href="/profile">Profile</a>
                    <a className="nav-link" href="/password/change">Change password</a>
                    <a className="nav-link" href="/login">Login</a>
                    <a className="nav-link" href="/signup">Sign up</a>
                    <a className="nav-link" href="/logout">Logout</a>
                </nav>
            </header>
            <main className="d-flex justify-content-center">
                <div className="col-md-6">
                <form>
                    <div className="mb-3">
                        <label htmlFor="login" className="col-form-label">Login:</label>
                        <input type="text" className="form-control" id="login" value={ login } onChange={ handleInput }/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="col-form-label">Password:</label>
                        <input type="password" className="form-control" id="password" value={ password } onChange={ handleInput }></input>
                    </div>
                    <div className="mb-3">                    
                        Don't have an account? <a className="link" href="/signup">Sign up</a>  
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary" onClick={ (e) => handleSubmit(e) }>Login</button>
                    </div>
                </form>
                <p>
                </p>
                </div>
            </main>
        </div>
    )
}

export default App;