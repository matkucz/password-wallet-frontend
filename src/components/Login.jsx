import { useState } from "react";
import { loginAuth } from "../api/auth";
import { useNavigate } from "react-router";

function Login (props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

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
        loginAuth(login, password).then(([data, errors]) => {
            if (errors) {
                console.error(data);
                if (typeof data.message === "string") {
                    setErrors(data);
                } else {
                    setErrors(data.message);
                }                
            } else {
                props.onLogin(data.access_token);
                navigate("/");
            }
        });
    }
    return (
        <main className="d-flex justify-content-center">
            <div className="col-md-6">
                <form>
                    {                        
                        errors.message && (
                            <div className="alert alert-danger" role="alert">
                                {  
                                    errors.message
                                }
                            </div>
                        )
                    }
                    <div className="mb-3">
                        <label htmlFor="login" className="col-form-label">Login:</label>
                        <input type="text" className="form-control" id="login" value={ login } onChange={ handleInput }/>
                    </div>
                    {
                        errors.login && (                    
                            <div className="alert alert-danger" role="alert">
                                {  
                                    errors.login.map((err) => {
                                        return err;
                                    })
                                }
                            </div>
                        )
                    }
                    <div className="mb-3">
                        <label htmlFor="password" className="col-form-label">Password:</label>
                        <input type="password" className="form-control" id="password" value={ password } onChange={ handleInput }></input>
                    </div>
                    {
                        errors.password && (                    
                            <div className="alert alert-danger" role="alert">
                                {  
                                    errors.password.map((err) => {
                                        return err;
                                    })
                                }
                            </div>
                        )
                    }
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