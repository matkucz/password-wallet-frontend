import { useState } from "react";

function Login (props) {
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
            </div>
        </main>
    )
}

export default Login;