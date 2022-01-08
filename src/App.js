import { useEffect, useRef } from "react";

function App(props) {
  const exampleModal = useRef(null);

  useEffect(() => {
    exampleModal.current.addEventListener('show.bs.modal', function (event) {
      // Button that triggered the modal
      let button = event.relatedTarget;
      // Extract info from data-bs-* attributes
      let recipient = button.getAttribute('data-bs-whatever')
      // If necessary, you could initiate an AJAX request here
      // and then do the updating in a callback.
      //
      // Update the modal's content.
      let modalTitle = exampleModal.current.querySelector('.modal-title')
      let modalBodyInput = exampleModal.current.querySelector('.modal-body input')
    
      modalTitle.textContent = 'New message to ' + recipient
      modalBodyInput.value = recipient
    });
  })
  
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
          <a className="nav-link" href="/password/change" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@change_password">Change password</a>
          <a className="nav-link" href="/login">Login</a>
          <a className="nav-link" href="/signup">Sign up</a>
          <a className="nav-link" href="/logout">Logout</a>
        </nav>
      </header>
      <main>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Open modal for @fat</button>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={exampleModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New message</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                  <input type="text" className="form-control" id="recipient-name"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Message:</label>
                  <textarea className="form-control" id="message-text"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Send message</button>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}

export default App;
