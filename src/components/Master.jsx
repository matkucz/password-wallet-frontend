import { useState } from "react";
import { useNavigate } from "react-router";
import { changeMasterPassword } from "../api/api";

function Master (props) {
    const [password, setPassword] = useState("");
    const [passwordRep, setPasswordRep] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        switch (event.target.id) {
            case "password":
                setPassword(event.target.value);
                break;
            case "passwordRep":
                setPasswordRep(event.target.value);
                break;
            case "newPassword":
                setNewPassword(event.target.value);
                break;
          default:
            break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "password": password,
            "password2": passwordRep,
            "new_password": newPassword
        }
        changeMasterPassword(data).then(([data, errors]) => {
            if (errors) {
                console.error(data);
                if (typeof data.message === "string") {
                    setErrors(data);
                } else {
                    setErrors(data.message);
                }                
            } else {
                setPassword("");
                setPasswordRep("");
                setNewPassword("");
                props.logout();
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
                        <label htmlFor="password" className="col-form-label">Old password:</label>
                        <input type="password" className="form-control" id="password" value={ password } onChange={ handleInput }/>
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
                        <label htmlFor="passwordRep" className="col-form-label">Old password (again):</label>
                        <input type="password" className="form-control" id="passwordRep" value={ passwordRep } onChange={ handleInput }></input>
                    </div>
                    {
                        errors.password2 && (                    
                            <div className="alert alert-danger" role="alert">
                                {  
                                    errors.password2.map((err) => {
                                        return err;
                                    })
                                }
                            </div>
                        )
                    }
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="col-form-label">New password:</label>
                        <input type="password" className="form-control" id="newPassword" value={ newPassword } onChange={ handleInput }></input>
                    </div>
                    {
                        errors.new_password && (                    
                            <div className="alert alert-danger" role="alert">
                                {  
                                    errors.new_password.map((err) => {
                                        return err;
                                    })
                                }
                            </div>
                        )
                    }
                    <div className="mb-3">
                        <button className="btn btn-primary" onClick={ (e) => handleSubmit(e) }>Change password</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Master;