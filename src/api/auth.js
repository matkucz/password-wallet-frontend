function login (login, password) {
    let errors = false;
    return fetch("http://127.0.0.1:5000/login", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    }).then((resp) => {
        if (resp.status !== 200) {
            errors = true;
        }
        return resp.json();
    }).then((data) => {
        return [data, errors];
    }).catch((err) => {
      console.error(err);
    });
}

function logout () {
    localStorage.removeItem("passToken");
}

function signup (login, password, isHash) {
    let errors = false;
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
    }).then((resp) => {
        if (resp.status !== 200) {
            errors = true;
        }
        return resp.json();
    }).then((data) => {
        return [data, errors];
    }).catch((err) => {
      console.error(err);
    });
}

export { login as loginAuth, logout, signup };