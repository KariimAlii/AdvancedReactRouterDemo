export function getAuthToken() {
    const token = localStorage.getItem("token");
    return token;
}

export function setAuthToken(token) {
    localStorage.setItem('token', token);
}