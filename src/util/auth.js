import {redirect} from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}
export function getAuthToken() {
    const token = localStorage.getItem("token");

    if(!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if(tokenDuration < 0) {
        //! token expired
        return 'EXPIRED';
    }

    return token;
}

export function setAuthToken(token) {
    localStorage.setItem('token', token);
}

export function setExpirationDate(expirationDate) {
    localStorage.setItem('expiration', expirationDate.toISOString());
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if(!token) {
        return redirect('/auth')
    }

    return null;
}