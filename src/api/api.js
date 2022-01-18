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


export function jwtProtected (url, token) {
    return fetch(url, {
        method: "",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
}


function getPasswords () {
    return getJWTRequest("http://localhost:5000/passwords");
    // const token = localStorage.getItem("passToken");
    // return fetch("http://localhost:5000/passwords", {
    //     method: "get",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`
    //     },
    // })
}

function addPassword (data) {
    const token = localStorage.getItem("passToken");
    return fetch("http://localhost:5000/passwords", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
}

function checkMasterPassword (data) {
    const token = localStorage.getItem("passToken");
    return fetch("http://localhost:5000/passwords/check", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
}

function encryptPassword (id) {
    const token = localStorage.getItem("passToken");
    return fetch("http://localhost:5000/passwords/encrypt/" + id, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
}

function sharePassword (data) {
    const token = localStorage.getItem("passToken");
    return fetch("http://localhost:5000/passwords/share", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
}

export { getPasswords, addPassword, checkMasterPassword, encryptPassword, sharePassword };


