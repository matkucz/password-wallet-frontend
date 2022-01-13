import { useState } from "react";

function Signup (props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isHash, setIsHash] = useState(false);

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
        console.log("signup: ", login, password, isHash);
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
                <div className="mb-3">                    
                    Already have an account? <a className="link" href="/login">Sign in</a>  
                </div>
                {/* <div class="field">
                <div class="control">
                <label class="radio">
                    <input type="radio" name="is_hash" value="true">
                    SHA512
                </label>
                <label class="radio">
                    <input type="radio" name="is_hash" value="false">
                    HMAC
                </label> */}
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