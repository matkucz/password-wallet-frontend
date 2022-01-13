import { useEffect, useState } from "react";
import Modal from "./Modal";

function Passwords (props) {
  const [ id, setId ] = useState(0);
  const [ shareId, setShareId ] = useState(0);
  const [ modalType, setModalType ] = useState("");
  const [ modalData, setModalData ] = useState({});
  const [title, setTitle] = useState("New password");
  const [ passwords, setPasswords ] = useState([
      {
        id: 1,
        login: "jażąbek",
        password: "fajny",
        web_address: "siema@siema.pl",
        description: "ąąąęęęśśśśś",
        encrypted: false,
        isOwner: false,
      },
      {
        id: 2,
        login: "trąbek",
        password: "normalny",
        web_address: "eniu@siema.pl",
        description: "ąąąęęęśśśśś",
        encrypted: false,
        isOwner: true,
      },
      {
        id: 3,
        login: "bąbek",
        password: "dziwny",
        web_address: "człeniu@siema.pl",
        description: "ąąąęęęśśśśś",
        encrypted: false,
        isOwner: true,
      }      
  ]);

  const sendEditData = () => {
    // console.log("edycja: ", login, password, webAddress, description);
  }

  const sendData = () => {
    // console.log("dodanie: ", login, password, webAddress, description);
  }

  const showPassword = (password) => {
    const index = passwords.indexOf(password);
    const newPasswords = passwords;
    newPasswords[index].encrypted = true;
    setPasswords([...newPasswords]);
  }

  // modal useEffect only when modal type or id changes
  useEffect(() => {
      // update the modal's content.
      if (modalType === "edit") {
        setTitle('Edit password');
        let password = passwords.find((element) => element.id === id);
        setModalData({
          login: password.login,
          password: password.password,
          webAddress: password.web_address,
          description: password.description
        });
      } else {
        setTitle('New password');
        setModalData({
          login: "",
          password: "",
          webAddress: "",
          description: ""
        });
      }
  }, [modalType, id]);

  return (    
      <main>
        <div className="d-flex justify-content-end p-2">
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
                            {
                              element.encrypted ? <td>{element.password}</td> : <td>********</td>
                            }                            
                            <td>{element.web_address}</td>
                            <td>{element.description}</td>
                            <td className='d-flex justify-content-end'>
                              <button 
                                type="button"
                                className="btn btn-warning" 
                                onClick={ () => {
                                    showPassword(element);
                                  }
                                }
                              >
                                Display
                              </button>
                              {
                                element.isOwner ?
                                  <>
                                  <button 
                                    type="button"
                                    className="btn btn-success ms-2" 
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
                                  <button 
                                    type="button"
                                    className="btn btn-danger ms-2"
                                    onClick={ () => {
                                        console.log(element.id)
                                      }
                                    }
                                  >
                                    Delete
                                  </button>
                                  <button 
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#shareModal"
                                    className="btn btn-primary ms-2"
                                    onClick={ () => {
                                        setShareId(element.id)
                                      }
                                    }
                                  >
                                    Share
                                  </button>
                                </> : <></>
                              }
                            </td>
                        </tr>
                    )                    
                })
            }
            </tbody>
        </table>
        </div>
        <Modal
          name="passwordModal"
          title={ title }
          modalType={ modalType }
          onSubmit={(data)=> console.log(data)}
          fields={
            [
              {
                type: "text",
                name: "login",
                label: "Login:",
                value: modalData.login,
              },
              {
                type: "password",
                name: "password",
                label: "Password:",
                value: modalData.password,
              },
              {
                type: "text",
                name: "webAddress",
                label: "Web address:",
                value: modalData.webAddress,
              },
              {
                type: "text",
                name: "description",
                label: "Description:",
                value: modalData.description,
              },
            ]
        }
        />
        <Modal
          name="shareModal"
          title="Share with other user"
          modalType="add"
          onSubmit={(data)=> console.log(data, shareId)}
          fields={
            [
              {
                type: "text",
                name: "login",
                label: "User login:",
                value: "",
              }
            ]
        }
        />
      </main>
  );
}

export default Passwords;
