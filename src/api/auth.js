function login (login, password) {
    return fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    }).then((resp) => {        
        return resp.json();
    })
}

function logout () {
    localStorage.removeItem("passToken");
}

function signup (login, password, isHash) {
    return fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password,
            is_hash: isHash,
        })
    })
}

export { login as loginAuth, logout, signup };