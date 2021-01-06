import {API} from '../config';

export const signup = (user) => {
    // console.log(name, email, password)
    return fetch(`${API}/signup`, {
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user) //converts object into string

    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
 };

 export const signin = (user) => {
    // console.log(name, email, password)
    return fetch(`${API}/signin`, {
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user) //converts object into string

    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
 }

 export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API}/auth/signout`, {
            method: "GET"
        })
            .then(response => {
                console.log("signout", response);
            })
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt")); // prior: true || this JSON is here because we need to fetch the data to populate userDashboard
    } else {
        return false;
    }
};