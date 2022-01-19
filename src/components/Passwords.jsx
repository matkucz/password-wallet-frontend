import { Component } from "react";
import { 
  getPasswords,
  addPassword,
  editPassword,
  deletePassword,
  checkMasterPassword,
  encryptPassword,
  sharePassword,
} from "../api/api";
import Modal from "./Modal";

class Passwords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      shareId: 0,
      modalType: "",
      modalData: {},
      title: "",
      passwords: [],
      masterPasswordChecked: false,
      readMode: true,
    };
  }

  getUserPasswords = () => {
    getPasswords().then(([data, errors]) => {
      if (errors) {
        console.error(data);
      } else {
        this.setState({ passwords: data.data });
      }
    });
  }

  componentDidMount = () => {
    this.getUserPasswords();
  }

  onPassModalSubmit = (data) => {
    if (data.login !== "" && data.password !== "" && data.web_address !== "" && data.description !== "") {
      if (this.state.modalType === "edit") {
        this.sendEditData(data);
      } else {
        this.sendData(data);
      }
    }
  }

  sendEditData = (data) => {
    editPassword(data, this.state.id).then(([data, errors]) => {
      if (errors) {
        console.error(data);
      } else {
        this.getUserPasswords();
      }
    });
  }

  sendData = (data) => {
    addPassword(data).then(([data, errors]) => {
      if (errors) {
        console.error(data);
      } else {
        this.getUserPasswords();
      }
    });
  }

  deletePassword = (id) => {
    deletePassword(id).then(([data, errors]) => {
      if (errors) {
        console.error(data);
      } else {
        this.getUserPasswords();
      }
    });
  }

  showPassword = (password) => {
    const index = this.state.passwords.indexOf(password);
    const newPasswords = this.state.passwords;
    encryptPassword(newPasswords[index].id).then(([data, errors]) => {
      if (errors) {
        console.error(data);
      } else {
        newPasswords[index].password = data.data;
        newPasswords[index].encrypted = true;
        this.setState({ passwords: [...newPasswords]});
      }
    });
  }

  sharePassword = (data) => {
    data.id = this.state.shareId;
    sharePassword(data).then(([data, errors]) => {
      if (errors) {
        console.error(data);
      }
    });
  }

  checkMasterPassword = (data) => {
    checkMasterPassword(data).then(([data, errors]) => {
      if (errors) {
        console.error(data);
      } else {
        this.setState({ masterPasswordChecked: true });
      }
    });
  }
  
  render () {
    return (    
        <main>
          <div className="row justify-content-between">
            <div className="col-4">
              <button 
                type="button"
                className={`btn btn-${ this.state.readMode ? "secondary" : "warning" }`}
                onClick={ () => this.setState({ readMode: !this.state.readMode }) }
              >
                Change to { this.state.readMode ? "edit" : "read" } mode
              </button>
            </div>
            <div className="col-1">
              <button 
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#passwordModal"
                onClick={ () => this.setState({ 
                    modalType: 'add',
                    title: 'New password',
                    modalData: {
                      login: '',
                      password: '',
                      web_address: '',
                      description: ''
                    }
                  }) 
                }
              >
                Add
              </button>
            </div>
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
                  this.state.passwords.map((element) => {
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
                                {
                                  !this.state.masterPasswordChecked ? (
                                    <button 
                                      type="button"
                                      data-bs-target="#masterModal"
                                      data-bs-toggle="modal"
                                      className="btn btn-warning"
                                    >
                                      Display
                                    </button>
                                  ) : (
                                    <button 
                                      type="button"
                                      className="btn btn-warning"
                                      onClick={ () => {
                                          this.showPassword(element);
                                        }
                                      }
                                    >
                                      Display
                                    </button>
                                  )
                                }
                                {
                                  element.is_owner ?
                                    <>
                                      <button 
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#shareModal"
                                        className="btn btn-primary ms-2"
                                        onClick={ () => {
                                            this.setState({ shareId :element.id });
                                          }
                                        }
                                      >
                                        Share
                                      </button>
                                    <button 
                                      type="button"
                                      className={ `btn btn-success ms-2${this.state.readMode ? " disabled" : ""}` }
                                      data-bs-toggle="modal"
                                      data-bs-target={!this.state.readMode ? "#passwordModal" : "#warningModal" }
                                      onClick={ () => {
                                        if (!this.state.readMode) {
                                          this.setState({ 
                                            modalType: "edit",
                                            id: element.id,
                                            title: 'Edit password',
                                            modalData: {
                                              login: element.login,
                                              password: "",
                                              web_address: element.web_address,
                                              description: element.description
                                            }, 
                                          });
                                        }
                                      }
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button 
                                      type="button"
                                      className={ `btn btn-danger ms-2${this.state.readMode ? " disabled" : ""}` }
                                      data-bs-toggle={ this.state.readMode ? "modal" : "" }
                                      data-bs-target={this.state.readMode ? "#warningModal" : "" }                                 
                                      onClick={ () => {
                                          if (!this.state.readMode) {
                                            this.deletePassword(element.id);
                                          }
                                        }
                                      }
                                    >
                                      Delete
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
            title={ this.state.title }
            modalType={ this.state.modalType }
            onSubmit={(data)=> this.onPassModalSubmit(data)}
            fields={
              [
                {
                  type: "text",
                  name: "login",
                  label: "Login:",
                  value: this.state.modalData.login,
                },
                {
                  type: "password",
                  name: "password",
                  label: "Password:",
                  value: this.state.modalData.password,
                },
                {
                  type: "text",
                  name: "web_address",
                  label: "Web address:",
                  value: this.state.modalData.web_address,
                },
                {
                  type: "text",
                  name: "description",
                  label: "Description:",
                  value: this.state.modalData.description,
                },
              ]
          }
          />
          <Modal
            name="masterModal"
            title="Insert master password"
            modalType="add"
            onSubmit={(data)=> this.checkMasterPassword(data)}
            fields={
              [
                {
                  type: "password",
                  name: "password",
                  label: "Master password:",
                  value: "",
                }
              ]
          }
          />
          <Modal
            name="shareModal"
            title="Share with other user"
            modalType="add"
            onSubmit={(data)=> this.sharePassword(data)}
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
          <Modal
            name="warningModal"
            title="You have to switch to edit mode."
            modalType="display"
            fields={[]}
            onSubmit={()=> {}}
          />
        </main>
    );
  }
}

export default Passwords;
