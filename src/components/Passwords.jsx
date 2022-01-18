import { Component } from "react";
import { getPasswords, addPassword, checkMasterPassword, encryptPassword, sharePassword } from "../api/api";
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
    // let errors = false;
    // getPasswords().then((res) => {
    //   if (res.status !== 200) {
    //     errors = true;
    //   }
    //   return res.json();
    // }).then((data) => {
    //   if (!errors) {
    //     this.setState({ passwords: data.data });
    //   } else {
    //     if (data.msg === "Token has expired") {
    //       this.props.logout();
    //     }
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // });
  }

  componentDidMount = () => {
    this.getUserPasswords();
  }

  // componentDidUpdate = (prevProps, prevState, snapshot) => {
  //   console.log(prevState);
  //   console.log(this.state)
  // }

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
    console.log(data, this.state.id);
  }

  sendData = (data) => {
    let errors = false;
    addPassword(data).then((res) => {
      if (res.status !== 200) {
        errors = true;
      }
      return res.json();
    }).then((data) => {
      if (!errors) {
        this.getUserPasswords();
      } else {
        console.log(data);
      }
    }).catch((err) => {
      console.log(err);
    })
    // console.log("dodanie: ", login, password, web_address, description);
  }

  showPassword = (password) => {
    let errors = false;
    const index = this.state.passwords.indexOf(password);
    const newPasswords = this.state.passwords;
    encryptPassword(newPasswords[index].id).then((res) => {
      if (res.status !== 200) {
        errors = true;
      }
      return res.json();
    }).then((data) => {
      if (!errors) {
        newPasswords[index].password = data.data;
        newPasswords[index].encrypted = true;
        this.setState({ passwords: [...newPasswords]});
      } else {
        console.log(data);
      }
    }).catch((err) => {
      console.log(err);
    })
    

    
  }

  sharePassword = (data) => {
    data.id = this.state.shareId;
    let errors = false;
    sharePassword(data).then((res) => {
      if (res.status !== 200) {
        errors = true;
      }
      return res.json();
    }).then((data) => {
      if (!errors) {
        // this.setState({ masterPasswordChecked: true });
      } else {
        console.log(data);
      }
    }).catch((err) => {
      console.error(err);
    })
  }

  checkMasterPassword = (data) => {
    let errors = false;
    checkMasterPassword(data).then((res) => {
      if (res.status !== 200) {
        errors = true;
      }
      return res.json();
    }).then((data) => {
      if (!errors) {
        this.setState({ masterPasswordChecked: true });
      } else {
        console.log(data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  
  // modal useEffect only when modal type or id changes
  // useEffect(() => {
  //     // update the modal's content.
  //     if (modalType === "edit") {
  //       setTitle('Edit password');
  //       let password = passwords.find((element) => element.id === id);
  //       setModalData({
  //         login: password.login,
  //         password: password.password,
  //         web_address: password.web_address,
  //         description: password.description
  //       });
  //     } else {
  //       setTitle('New password');
  //       setModalData({
  //         login: "",
  //         password: "",
  //         web_address: "",
  //         description: ""
  //       });
  //     }
  // }, [modalType, id]);
  render () {
    return (    
        <main>
          <div className="d-flex justify-content-end p-2">
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
                                      className="btn btn-success ms-2" 
                                      data-bs-toggle="modal"
                                      data-bs-target="#passwordModal"
                                      onClick={ () => {
                                        // let password = passwords.find((element) => element.id === id);
                                          this.setState({ 
                                            modalType: "edit",
                                            id: element.id,
                                            title: 'Edit password',
                                            modalData: {
                                              login: element.login,
                                              password: "",
                                              web_address: element.web_address,
                                              description: element.description
                                          }, });
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
                                          this.setState({ shareId :element.id });
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
        </main>
    );
  }
}

export default Passwords;
