import { useEffect, useState } from "react";

function App (props) {
  const [id, setId] = useState(0);
  const [modalType, setModalType] = useState("");
  const [title, setTitle] = useState("New password");
  const [buttonText, setButtonText] = useState("Add");
  const [buttonClass, setButtonClass] = useState("btn btn-primary");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [webAddress, setWebAddress] = useState("");
  const [description, setDescription] = useState("");
  const passwords = [
      {
        id: 1,
        login: "jażąbek",
        password: "ęęęąąąąśśś",
        web_address: "siema@siema.pl",
        description: "ąąąęęęśśśśś"
      },
      {
        id: 2,
        login: "trąbek",
        password: "ęęęąąąąśśś",
        web_address: "eniu@siema.pl",
        description: "ąąąęęęśśśśś"
      },
      {
        id: 3,
        login: "bąbek",
        password: "ęęęąąąąśśś",
        web_address: "człeniu@siema.pl",
        description: "ąąąęęęśśśśś"
      }      
  ];

  const handleInput = (event) => {
    switch (event.target.id) {
      case "login":
        setLogin(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "webAddress":
        setWebAddress(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      default:        
        break;
    }
  }

  const sendEditData = () => {
    console.log("edycja: ", login, password, webAddress, description);
  }

  const sendData = () => {
    console.log("dodanie: ", login, password, webAddress, description);
  }
  // modal useEffect only when modal type or id changes
  useEffect(() => {
      // update the modal's content.
      if (modalType === "edit") {
        setTitle('Edit password');
        setButtonClass("btn btn-success");
        let password = passwords.find((element) => element.id === id);
        setButtonText("Edit");
        setPassword(password.password);
        setLogin(password.login);
        setWebAddress(password.web_address);
        setDescription(password.description);
      } else {
        setTitle('New password');
        setButtonClass("btn btn-primary");
        setButtonText("Add");
        setPassword("");
        setLogin("");
        setWebAddress("");
        setDescription("");
      }
  }, [modalType, id]);
  
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
      <main>
        <div className="float-right">
          <button 
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#passwordModal"
            onClick={ () => setModalType("add") }
          >
            Add
          </button>
        </div>
        <div>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Login</th>
                    <th scope="col">Password</th>
                    <th scope="col">Web address</th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            {
                passwords.map((element) => {
                    return (
                        <tr key={element.id}>
                            <th scope="row">{element.id}</th>
                            <td>{element.login}</td>
                            <td>{element.password}</td>
                            <td>{element.web_address}</td>
                            <td>{element.description}</td>
                            <td>
                              <button 
                                type="button"
                                className="btn btn-success" 
                                data-bs-toggle="modal"
                                data-bs-target="#passwordModal"
                                onClick={ () => {
                                    setModalType("edit");
                                    setId(element.id);
                                  }
                                }
                              >
                                Edit
                              </button>
                            </td>
                        </tr>
                    )                    
                })
            }
            </tbody>
        </table>
        </div>
        <div className="modal fade" id="passwordModal" tabIndex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="passwordModalLabel">{ title }</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
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
                                <label htmlFor="webAddress" className="col-form-label">Web address:</label>
                                <input type="text" className="form-control" id="webAddress" value={ webAddress } onChange={ handleInput }></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="col-form-label">Description:</label>
                                <input type="text" className="form-control" id="description" value={ description } onChange={ handleInput }></input>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button 
                          type="button"
                          className={ buttonClass }
                          id="modalConfirmButton"
                          onClick={ () => { return modalType === "edit" ? sendEditData() : sendData() }}
                        >
                          { buttonText }
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;
