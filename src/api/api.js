function getJWTRequest (url) {
    let errors = false;
    const token = localStorage.getItem("passToken") || "";
    return fetch(url, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then((res) => {
      if (res.status !== 200) {
        errors = true;
      }
      return res.json();
    }).then((data) => {
        return [data, errors];
    }).catch((err) => {
      console.error(err);
    })
}

function postJWTRequest (url, body) {
    let errors = false;
    const token = localStorage.getItem("passToken") || "";
    return fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }).then((res) => {
      if (res.status !== 200) {
        errors = true;
      }
      return res.json();
    }).then((data) => {
        return [data, errors];
    }).catch((err) => {
      console.error(err);
    })
}


function putJWTRequest (url, body) {
    let errors = false;
    const token = localStorage.getItem("passToken") || "";
    return fetch(url, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }).then((res) => {
      if (res.status !== 200) {
        errors = true;
      }
      return res.json();
    }).then((data) => {
        return [data, errors];
    }).catch((err) => {
      console.error(err);
    })
}

function deleteJWTRequest (url, body) {
    let errors = false;
    const token = localStorage.getItem("passToken") || "";
    return fetch(url, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }).then((res) => {
      if (res.status !== 200) {
        errors = true;
      }
      return res.json();
    }).then((data) => {
        return [data, errors];
    }).catch((err) => {
      console.error(err);
    })
}

function getPasswords () {
    return getJWTRequest("http://localhost:5000/passwords");
}

function addPassword (data) {
    return postJWTRequest("http://localhost:5000/passwords", data);
}

function editPassword (data, id) {
    return putJWTRequest("http://localhost:5000/passwords/" + id, data);
}

function deletePassword (id) {
    return deleteJWTRequest("http://localhost:5000/passwords/" + id);
}

function checkMasterPassword (data) {
    return postJWTRequest("http://localhost:5000/master/check", data);
}

function encryptPassword (id) {
    return getJWTRequest("http://localhost:5000/passwords/encrypt/" + id);
}

function sharePassword (data) {
    return postJWTRequest("http://localhost:5000/passwords/share", data);
}

function checkToken () {
    return getJWTRequest("http://localhost:5000/");
}

function changeMasterPassword (data) {
    return putJWTRequest("http://localhost:5000/master", data);
}

export { 
    getPasswords,
    addPassword,
    editPassword,
    deletePassword,
    checkMasterPassword,
    encryptPassword,
    sharePassword,
    checkToken,
    changeMasterPassword,
};