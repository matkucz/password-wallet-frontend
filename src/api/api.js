export function jwtProtected (url, token) {
    return fetch(url, {
        method: "",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

    })
}