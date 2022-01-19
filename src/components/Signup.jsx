import { useState } from "react";
import { signup } from "../api/auth";

function Signup (props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isHash, setIsHash] = useState(null);
    const [errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleInput = (event) => {
        switch (event.target.id) {
          case "login":
            setLogin(event.target.value);
            break;
          case "password":
            setPassword(event.target.value);
            break;
          case "sha512":
            setIsHash(false);
            break;
          case "hmac":
            setIsHash(true);
            break;
          default:
            break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(login, password, isHash).then(([data, errors]) => {
            if (errors) {
                console.error(data);
                if (typeof data.message === "string") {
                    setErrors(data);
                } else {
                    setErrors(data.message);
                }
                setLoginSuccess(false);
            } else {
                setErrors({});
                setLoginSuccess(true);
                setLogin("");
                setPassword("");
                setIsHash(null);
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
                {                        
                    loginSuccess && (
                        <div className="alert alert-success" role="alert">
                            Account created.
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
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="isHash" id="sha512" onChange={ handleInput }/>
                        <label className="form-check-label" htmlFor="sha512">
                            SHA512
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="isHash" id="hmac" onChange={ handleInput }/>
                        <label className="form-check-label" htmlFor="hmac">
                            HMAC
                        </label>
                    </div>
                </div>
                {
                    errors.is_hash && (
                        <div className="alert alert-danger" role="alert">
                            {  
                                errors.is_hash.map((err) => {
                                    return err;
                                })
                            }
                        </div>
                    )
                }
                <div className="mb-3">                    
                    Already have an account? <a className="link" href="/login">Sign in</a>  
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={ (e) => handleSubmit(e) }>Sign up</button>
                </div>
            </form>
            <p>
            </p>
            </div>
        </main>
    )
}

export default Signup;